import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Project, Node } from 'ts-morph';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ElementFile {
  filename: string;
  language: string;
  code: string;
  description?: string;
  isEntryPoint?: boolean;
}

interface VariationConfig {
  name: string;
  description: string;
  tags?: string[];
}

interface DiscoveredVariation {
  key: string;
  exportName: string;
  metadata: {
    name: string;
    description: string;
    tags?: string[];
  };
  files: ElementFile[];
  demoPath: string;
}

function deriveName(exportName: string): string {
  return exportName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .filter(Boolean)
    .join(' ');
}

function deriveDescription(exportName: string): string {
  return `${deriveName(exportName)} variation`;
}

function extractExportName(indexPath: string): string {
  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(indexPath);
    const exportedDeclarations = sourceFile.getExportedDeclarations();

    for (const [exportName, declarations] of exportedDeclarations) {
      for (const declaration of declarations) {
        if (
          Node.isTypeAliasDeclaration(declaration) ||
          Node.isInterfaceDeclaration(declaration)
        ) {
          continue;
        }

        if (
          Node.isFunctionDeclaration(declaration) ||
          Node.isVariableDeclaration(declaration)
        ) {
          return exportName;
        }
      }
    }

    throw new Error(`No exported component found in ${indexPath}`);
  } catch (error) {
    throw new Error(
      `Failed to extract export name from ${indexPath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

function extractMetadataFromIndexTsx(indexPath: string): { name?: string; description?: string } {
  try {
    const content = fs.readFileSync(indexPath, 'utf-8');
    const metadataMatch = content.match(/export const metadata = \{([^}]*)\}/s);

    if (!metadataMatch) {
      return {};
    }

    const metadataStr = `{${metadataMatch[1]}}`;
    const nameMatch = metadataStr.match(/name:\s*['"]([^'"]*)['"]/);
    const descMatch = metadataStr.match(/description:\s*['"]([^'"]*)['"]/);

    return {
      name: nameMatch?.[1],
      description: descMatch?.[1],
    };
  } catch (error) {
    return {};
  }
}

function loadVariationConfig(variationPath: string, exportName: string): VariationConfig {
  const indexPath = path.join(variationPath, 'index.tsx');
  const extracted = extractMetadataFromIndexTsx(indexPath);

  return {
    name: extracted.name || deriveName(exportName),
    description: extracted.description || deriveDescription(exportName),
  };
}

function readFileContent(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function scanVariationFiles(variationPath: string): ElementFile[] {
  const files: ElementFile[] = [];
  const filesToProcess: { path: string; filename: string; isEntryPoint: boolean }[] = [];

  const layoutDir = path.join(variationPath, 'layout');
  if (fs.existsSync(layoutDir)) {
    const layoutFiles = fs
      .readdirSync(layoutDir)
      .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'));
    filesToProcess.push(
      ...layoutFiles.map((file) => ({
        path: path.join(layoutDir, file),
        filename: file,
        isEntryPoint: false,
      }))
    );
  }

  const componentsDir = path.join(variationPath, 'components');
  if (fs.existsSync(componentsDir)) {
    const componentFiles = fs
      .readdirSync(componentsDir)
      .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'));
    filesToProcess.push(
      ...componentFiles.map((file) => ({
        path: path.join(componentsDir, file),
        filename: file,
        isEntryPoint: false,
      }))
    );
  }

  const indexPath = path.join(variationPath, 'index.tsx');
  if (fs.existsSync(indexPath)) {
    filesToProcess.unshift({
      path: indexPath,
      filename: 'index.tsx',
      isEntryPoint: true,
    });
  }

  for (const fileInfo of filesToProcess) {
    const code = readFileContent(fileInfo.path);
    if (code !== null) {
      files.push({
        filename: fileInfo.filename,
        language: fileInfo.path.endsWith('.ts') ? 'typescript' : 'typescript',
        code,
        isEntryPoint: fileInfo.isEntryPoint,
      });
    }
  }

  return files;
}

function discoverElementVariations(
  elementPath: string,
  elementName: string
): DiscoveredVariation[] {
  const variationsDir = path.join(elementPath, 'variations');

  if (!fs.existsSync(variationsDir)) {
    console.warn(`No variations directory found for ${elementName}`);
    return [];
  }

  const variationFolders = fs
    .readdirSync(variationsDir)
    .filter((f) => /^\d{2}-/.test(f))
    .sort();

  return variationFolders.map((key) => {
    const variationPath = path.join(variationsDir, key);
    const indexPath = path.join(variationPath, 'index.tsx');

    if (!fs.existsSync(indexPath)) {
      throw new Error(
        `Missing index.tsx in ${elementName} > ${key}/index.tsx`
      );
    }

    const exportName = extractExportName(indexPath);
    const config = loadVariationConfig(variationPath, exportName);
    const files = scanVariationFiles(variationPath);

    // Extract just the element name without category prefix (last part of the path)
    const justElementName = elementName.split('/').pop() || elementName;
    const demoPath = `${justElementName.toLowerCase()}-${key.replace(/^\d+-/, '')}`;

    return {
      key,
      exportName,
      metadata: {
        name: config.name,
        description: config.description,
        ...(config.tags && { tags: config.tags }),
      },
      files,
      demoPath,
    };
  });
}

function discoverAllElements(): Record<string, DiscoveredVariation[]> {
  const elementsPath = path.join(__dirname, '..', 'src', 'elements');

  if (!fs.existsSync(elementsPath)) {
    console.error(`Elements directory not found at ${elementsPath}`);
    process.exit(1);
  }

  const discovered: Record<string, DiscoveredVariation[]> = {};

  console.log('\n🔍 Discovering element variations...\n');

  function walkDirectory(dirPath: string, relativePath: string = '') {
    const items = fs
      .readdirSync(dirPath)
      .filter((f) => {
        const fullPath = path.join(dirPath, f);
        return fs.statSync(fullPath).isDirectory() && !f.startsWith('.');
      })
      .sort();

    for (const itemName of items) {
      const itemPath = path.join(dirPath, itemName);
      const variationsPath = path.join(itemPath, 'variations');
      const elementKey = relativePath ? `${relativePath}/${itemName}` : itemName;

      if (fs.existsSync(variationsPath)) {
        // This is an element with variations
        try {
          const variations = discoverElementVariations(itemPath, elementKey);
          if (variations.length === 0) {
            continue;
          }

          discovered[elementKey] = variations;

          console.log(`  ✓ ${elementKey} (${variations.length} variations)`);
          variations.forEach((v) => {
            console.log(`    - ${v.key}: "${v.metadata.name}"`);
          });
        } catch (error) {
          console.error(
            `  ✗ ${elementKey}: ${error instanceof Error ? error.message : String(error)}`
          );
          process.exit(1);
        }
      } else {
        // This might be a category folder, recurse into it
        walkDirectory(itemPath, elementKey);
      }
    }
  }

  walkDirectory(elementsPath);

  return discovered;
}

function generateVariationsJson(
  elementPath: string,
  variations: DiscoveredVariation[]
): void {
  const variationsJson: Record<string, any> = {};

  for (const variation of variations) {
    variationsJson[variation.key] = {
      name: variation.metadata.name,
      description: variation.metadata.description,
      demoPath: variation.demoPath,
      exportName: variation.exportName,
      files: variation.files,
      ...(variation.metadata.tags && { tags: variation.metadata.tags }),
    };
  }

  const outputPath = path.join(elementPath, 'variations.json');
  fs.writeFileSync(outputPath, JSON.stringify(variationsJson, null, 2));
}

async function main() {
  try {
    const discovered = discoverAllElements();

    console.log('\n📝 Generating variations.json files...\n');

    const elementsPath = path.join(__dirname, '..', 'src', 'elements');

    for (const [elementName, variations] of Object.entries(discovered)) {
      const elementPath = path.join(elementsPath, elementName);
      generateVariationsJson(elementPath, variations);
      console.log(`  ✓ ${elementName}/variations.json`);
    }

    console.log('\n✅ Element variation discovery complete!\n');
  } catch (error) {
    console.error(
      '\n❌ Error during element discovery:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

main();
