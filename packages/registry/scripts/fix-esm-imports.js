#!/usr/bin/env node

/**
 * Post-build script to add .js extensions to relative imports in ESM modules
 * Node.js ESM requires explicit file extensions for all relative imports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Match: from './something' or from "./something"
  // But NOT: from './something.js' or from './something.json'
  // Pattern: from ['"]\..*(?<!\.js)(?<!\.json)['"]

  // This regex finds imports without extensions
  content = content.replace(
    /from\s+(['"])(\.[^'"]*?)(?<!\.js)(?<!\.json)(?<!\.css)\1/g,
    (match, quote, importPath) => {
      // Don't add .js if it already has a file extension
      if (/\.\w+$/.test(importPath)) {
        return match;
      }
      return `from ${quote}${importPath}.js${quote}`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let modified = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      modified += walkDir(filePath);
    } else if (file.endsWith('.js') && !file.endsWith('.map.js')) {
      if (processFile(filePath)) {
        modified++;
      }
    }
  }

  return modified;
}

console.log('🔧 Fixing ESM imports with .js extensions...');
const modified = walkDir(distDir);
console.log(`✅ Fixed ${modified} file(s)`);
