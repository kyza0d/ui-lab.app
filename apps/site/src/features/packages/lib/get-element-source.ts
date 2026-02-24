'use client';

import { elementsList } from 'ui-lab-registry';

function buildSourceCodeMap(): Record<string, string> {
  const map: Record<string, string> = {};

  elementsList.forEach((element) => {
    element.variants.forEach((variant) => {
      if (variant.demoPath && variant.files && variant.files.length > 0) {
        const entryPointFile = variant.files.find((f) => f.isEntryPoint) || variant.files[0];
        if (entryPointFile) {
          map[variant.demoPath] = entryPointFile.code;
        }
      }
    });
  });

  return map;
}

const sourceCodeMap = buildSourceCodeMap();

export function getElementSourceCode(demoPath: string): string | null {
  return sourceCodeMap[demoPath] || null;
}
