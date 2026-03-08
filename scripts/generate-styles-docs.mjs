import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import ts from 'typescript'; // Import TypeScript

const UI_COMPONENTS_PATH = 'packages/@ui/src/components';
const REGISTRY_PATH = 'packages/registry/src';
const OUTPUT_FILE = path.join(REGISTRY_PATH, 'generated-styles.ts');
const REGISTRY_DIST_PATH = 'packages/registry/dist';
const OUTPUT_JSON_FILE = path.join(REGISTRY_DIST_PATH, 'generated-styles.json');

// Helper to extract referenced variables and default values from a CSS value string
function extractVarDetails(value) {
  const varRegex = /var\((--[\w-]+)(?:\s*,\s*([^)]+))?\)/g;
  let match;
  const referencedVars = new Set();
  let defaultValue = null;

  while ((match = varRegex.exec(value)) !== null) {
    referencedVars.add(match[1]); // The variable name itself
    if (match[2] && defaultValue === null) { // Capture the first default value found
      defaultValue = match[2].trim();
    }
  }
  return { referencedVars: Array.from(referencedVars), defaultValue };
}

function resolveSelector(rule) {
  if (!rule || rule.type !== 'rule') return '';
  let selector = rule.selector;
  if (rule.parent && rule.parent.type === 'rule') {
    const parentSelector = resolveSelector(rule.parent);
    if (!parentSelector) return selector;
    if (selector.includes('&')) {
      selector = selector.replace(/&/g, parentSelector);
    } else {
      selector = `${parentSelector} ${selector}`;
    }
  }
  return selector;
}

// New function to extract styleable parts from a .tsx file using TypeScript AST
async function extractStyleablePartsFromTsx(tsxFilePath) {
  try {
    const fileContent = await fs.readFile(tsxFilePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      tsxFilePath,
      fileContent,
      ts.ScriptTarget.Latest,
      true // Set setParentNodes to true to enable parent traversal
    );

    const typeMap = new Map();
    const styleSlotsNodes = [];

    // First pass: collect all interfaces and type aliases, and find all *StyleSlots
    function collectTypes(node) {
      if (ts.isInterfaceDeclaration(node)) {
        const name = node.name.text;
        typeMap.set(name, node);
        if (name.endsWith('StyleSlots')) {
          styleSlotsNodes.push(node);
        }
      } else if (ts.isTypeAliasDeclaration(node)) {
        const name = node.name.text;
        typeMap.set(name, node);
        if (name.endsWith('StyleSlots')) {
          styleSlotsNodes.push(node);
        }
      }
      ts.forEachChild(node, collectTypes);
    }
    collectTypes(sourceFile);

    const styleableParts = [];

    if (styleSlotsNodes.length > 0) {
      const results = new Set();

      function resolveType(type) {
        if (!type) return type;
        if (ts.isTypeReferenceNode(type)) {
          const name = type.typeName.getText();
          return typeMap.get(name) || type;
        }
        return type;
      }

      function getProperties(node) {
        if (!node) return [];
        if (ts.isInterfaceDeclaration(node)) {
          return node.members.filter(ts.isPropertySignature);
        }
        if (ts.isTypeAliasDeclaration(node)) {
          return getProperties(resolveType(node.type));
        }
        if (ts.isTypeLiteralNode(node)) {
          return node.members.filter(ts.isPropertySignature);
        }
        if (ts.isUnionTypeNode(node)) {
          let all = [];
          for (const t of node.types) {
            all = all.concat(getProperties(resolveType(t)));
          }
          return all;
        }
        return [];
      }

      function walk(prefix, node) {
        const props = getProperties(node);
        if (props.length === 0) {
          if (prefix) results.add(prefix);
          return;
        }

        for (const prop of props) {
          const name = prop.name.getText();
          const fullPath = prefix ? `${prefix}.${name}` : name;
          const propType = resolveType(prop.type);
          const subProps = getProperties(propType);

          if (subProps.length > 0) {
            walk(fullPath, propType);
          } else {
            results.add(fullPath);
          }
        }
      }

      for (const styleSlotsNode of styleSlotsNodes) {
        walk('', styleSlotsNode);
      }
      styleableParts.push(...Array.from(results));
    }

    // Fallback: search for createStylesResolver if StyleSlots wasn't found or as additional source
    if (styleableParts.length === 0) {
      function visit(node) {
        if (ts.isCallExpression(node)) {
          const callExpression = node;
          if (ts.isIdentifier(callExpression.expression) && callExpression.expression.text === 'createStylesResolver') {
            if (callExpression.arguments.length > 0) {
              let arrayArgument = callExpression.arguments[0];

              if (ts.isAsExpression(arrayArgument) && ts.isArrayLiteralExpression(arrayArgument.expression)) {
                arrayArgument = arrayArgument.expression;
              }

              if (ts.isArrayLiteralExpression(arrayArgument)) {
                for (const element of arrayArgument.elements) {
                  if (ts.isStringLiteral(element)) {
                    styleableParts.push(element.text);
                  }
                }
              }
            }
          }
        }
        ts.forEachChild(node, visit);
      }
      ts.forEachChild(sourceFile, visit);
    }

    return Array.from(new Set(styleableParts));
  } catch (error) {
    console.warn(`Failed to extract styleable parts from ${tsxFilePath}: ${error.message}`);
    return [];
  }
}

async function main() {
  console.log('Generating styles documentation...');

  const cssModulePaths = await glob(`${UI_COMPONENTS_PATH}/**/*.module.css`);
  const generatedStyles = {};

  for (const cssModulePath of cssModulePaths) {
    const componentDir = path.dirname(cssModulePath);
    const componentName = path.basename(componentDir); // Get component name (e.g., "Banner")
    const componentLowerName = componentName.toLowerCase();

    // Construct the corresponding .tsx file path(s)
    const tsxFilePaths = await glob(`${componentDir}/*.tsx`);
    const extractedStyleableParts = [];

    for (const tsxFilePath of tsxFilePaths) {
      const parts = await extractStyleablePartsFromTsx(tsxFilePath);
      extractedStyleableParts.push(...parts);
    }

    const uniqueStyleableParts = Array.from(new Set(extractedStyleableParts));

    const rawCss = await fs.readFile(cssModulePath, 'utf-8');
    const cssVariables = []; // New array to store CSS variables

    const root = postcss.parse(rawCss);

    // Extract CSS variables (existing logic)
    root.walkDecls(decl => {
      if (decl.prop.startsWith('--')) {
        const { referencedVars, defaultValue } = extractVarDetails(decl.value);
        const selector = resolveSelector(decl.parent);
        cssVariables.push({
          name: decl.prop,
          value: decl.value,
          defaultValue: defaultValue,
          referencedVars: referencedVars,
          variant: selector,
        });
      }
    });

    generatedStyles[componentLowerName] = { // Use lowercased component name for the key
      rawCss,
      styleableParts: uniqueStyleableParts.map(name => ({ name })), // Map to { name: string } objects
      cssVariables,
    };
  }

  const fileContent = `// This file is auto-generated. Do not edit.
export const generatedStyles: Record<string, { rawCss: string; styleableParts: Array<{ name: string }>; cssVariables: Array<{ name: string; value: string; defaultValue?: string; referencedVars: string[]; variant?: string | null }> }> = ${JSON.stringify(generatedStyles, null, 2)};
`;

  const jsonFileContent = JSON.stringify(generatedStyles, null, 2);

  await fs.ensureDir(path.dirname(OUTPUT_FILE));
  await fs.writeFile(OUTPUT_FILE, fileContent);

  await fs.ensureDir(path.dirname(OUTPUT_JSON_FILE));
  await fs.writeFile(OUTPUT_JSON_FILE, jsonFileContent);


  console.log(`✅ Styles documentation generated at ${OUTPUT_FILE}`);
  console.log(`✅ Styles documentation generated at ${OUTPUT_JSON_FILE}`);
}

main().catch(error => {
  console.error('Error generating styles documentation:', error);
  process.exit(1);
});
