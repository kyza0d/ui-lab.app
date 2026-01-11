import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

function getFilesInDirectory(dirPath) {
  try {
    return fs.readdirSync(dirPath).filter(file => file.endsWith('.tsx'));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return [];
  }
}

function generateVariationMetadata(elementPath, elementName, variationKey, variationMeta) {
  const variationPath = path.join(elementPath, 'variations', variationKey);

  if (!fs.existsSync(variationPath)) {
    console.warn(`Variation path not found: ${variationPath}`);
    return null;
  }

  const files = [];
  const filesToProcess = [];

  // Process layout directory
  const layoutDir = path.join(variationPath, 'layout');
  if (fs.existsSync(layoutDir)) {
    const layoutFiles = getFilesInDirectory(layoutDir);
    filesToProcess.push(
      ...layoutFiles.map(file => ({
        path: path.join(layoutDir, file),
        filename: file,
        isEntryPoint: false,
      }))
    );
  }

  // Process components directory
  const componentsDir = path.join(variationPath, 'components');
  if (fs.existsSync(componentsDir)) {
    const componentFiles = getFilesInDirectory(componentsDir);
    filesToProcess.push(
      ...componentFiles.map(file => ({
        path: path.join(componentsDir, file),
        filename: file,
        isEntryPoint: false,
      }))
    );
  }

  // Process index.tsx (entry point)
  const indexPath = path.join(variationPath, 'index.tsx');
  if (fs.existsSync(indexPath)) {
    filesToProcess.unshift({
      path: indexPath,
      filename: 'index.tsx',
      isEntryPoint: true,
    });
  }

  // Read all files
  for (const fileInfo of filesToProcess) {
    const code = readFileContent(fileInfo.path);
    if (code !== null) {
      files.push({
        filename: fileInfo.filename,
        language: 'typescript',
        code,
        isEntryPoint: fileInfo.isEntryPoint,
      });
    }
  }

  // Generate demo path from variation key
  const elementPrefix = elementName.toLowerCase();
  const demoPath = variationKey.replace(/^\d+-/, '').toLowerCase();

  return {
    name: variationMeta.name,
    description: variationMeta.description,
    demoPath: `${elementPrefix}-${demoPath}`,
    files,
  };
}

function generateVariations(elementName) {
  const elementPath = path.join(__dirname, '..', 'src', 'elements', elementName);
  const metadataPath = path.join(elementPath, 'metadata.json');
  const variationsMetadataPath = path.join(elementPath, 'variations.metadata.json');

  if (!fs.existsSync(metadataPath)) {
    console.error(`metadata.json not found for ${elementName}`);
    process.exit(1);
  }

  if (!fs.existsSync(variationsMetadataPath)) {
    console.error(`variations.metadata.json not found for ${elementName}`);
    process.exit(1);
  }

  const metadata = JSON.parse(readFileContent(metadataPath));
  const variationsMetadata = JSON.parse(readFileContent(variationsMetadataPath));

  const generatedVariations = {};

  for (const [variationKey, variationMeta] of Object.entries(variationsMetadata)) {
    const variation = generateVariationMetadata(elementPath, elementName, variationKey, variationMeta);
    if (variation) {
      generatedVariations[variationKey] = variation;
    }
  }

  // Write generated variations
  const outputPath = path.join(elementPath, 'variations.json');
  fs.writeFileSync(outputPath, JSON.stringify(generatedVariations, null, 2));

  console.log(`Generated variations.json for ${elementName} at ${outputPath}`);
  return generatedVariations;
}

// Generate for Header and Sidebar elements
const header = generateVariations('Header');
console.log('Generated variations:', Object.keys(header));
const sidebar = generateVariations('Sidebar');
console.log('Generated variations:', Object.keys(sidebar));
