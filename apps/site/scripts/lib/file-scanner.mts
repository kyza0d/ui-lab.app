import fs from 'fs';
import path from 'path';

function walkDir(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file.endsWith('.mdx') && file !== 'index.mdx') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export async function scanContentDirectory(contentDir: string) {
  try {
    if (!fs.existsSync(contentDir)) {
      console.warn(`Content directory not found: ${contentDir}`);
      return [];
    }

    const filePaths = walkDir(contentDir);
    return filePaths.map(filePath => {
      const relativePath = path.relative(contentDir, filePath);
      return {
        path: relativePath,
        slug: relativePath.replace(/\.mdx$/, '').replace(/\//g, '-'),
        fileName: path.basename(filePath),
        fullPath: filePath,
      };
    });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(`Error scanning ${contentDir}:`, errorMessage);
    return [];
  }
}
