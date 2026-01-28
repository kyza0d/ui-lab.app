import React from 'react';
import type { ElementPackageRegistry } from '../types.js';

function FoundationLogo({ className }: { className?: string }) {
  return React.createElement('svg', {
    width: '26',
    height: '26',
    viewBox: '0 0 23 23',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className || 'w-10 h-10 text-foreground-200',
  }, React.createElement('path', {
    fillRule: 'evenodd',
    clipRule: 'evenodd',
    d: 'M11.0982 4.6488C11.2657 4.55211 11.4721 4.55211 11.6396 4.6488L17.0533 7.77443C17.2208 7.87114 17.324 8.04988 17.324 8.24329V14.4945C17.324 14.688 17.2208 14.8667 17.0533 14.9634L15.7977 15.6883C15.5388 15.8378 15.2077 15.7491 15.0582 15.4901L14.5276 14.5712C14.3781 14.3123 14.4669 13.9812 14.7258 13.8317L14.9095 13.7256C15.077 13.6289 15.1802 13.4502 15.1802 13.2568V9.48103C15.1802 9.28763 15.077 9.10889 14.9095 9.0122L11.6396 7.12432C11.4721 7.0276 11.2657 7.0276 11.0982 7.12432L7.82828 9.0122C7.66078 9.10889 7.5576 9.28763 7.5576 9.48103V13.2568C7.5576 13.4502 7.66078 13.6289 7.82828 13.7256L11.0982 15.6135C11.2657 15.7102 11.4721 15.7102 11.6396 15.6135L11.7337 15.5591C11.9927 15.4097 12.3238 15.4984 12.4733 15.7573L13.0038 16.6762C13.1533 16.9352 13.0646 17.2663 12.8057 17.4158L11.6396 18.089C11.4721 18.1857 11.2657 18.1857 11.0982 18.089L5.68444 14.9634C5.51694 14.8667 5.41375 14.688 5.41375 14.4945V8.24329C5.41375 8.04988 5.51694 7.87114 5.68444 7.77443L11.0982 4.6488Z',
    fill: 'currentColor',
  }));
}

function AILogo({ className }: { className?: string }) {
  return React.createElement('svg', {
    width: '26',
    height: '26',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className || 'w-10 h-10 text-foreground-200',
  }, React.createElement('path', {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z',
    fill: 'currentColor',
  }));
}

function DocumentationLogo({ className }: { className?: string }) {
  return React.createElement('svg', {
    width: '26',
    height: '26',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className || 'w-10 h-10 text-foreground-200',
  }, React.createElement('path', {
    d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z',
    fill: 'currentColor',
    opacity: 0.3,
  }), React.createElement('path', {
    d: 'M14 2v6h6',
    stroke: 'currentColor',
    strokeWidth: 2,
    fill: 'none',
  }), React.createElement('path', {
    d: 'M9 15h6M9 11h6',
    stroke: 'currentColor',
    strokeWidth: 2,
    fill: 'none',
  }));
}

export const elementPackages: ElementPackageRegistry = {
  foundation: {
    id: 'foundation',
    name: 'Foundation',
    description: 'Core layout elements for building application structure including headers, sidebars, and page containers.',
    tags: ['layout', 'structure', 'core'],
    elements: ['header', 'sidebar', 'page'],
    layout: {
      columnSpan: 2,
      rowSpan: 1,
    },
    getPreview: () => {
      return () => React.createElement('div', {
        className: 'flex items-center justify-center h-full w-full',
      }, React.createElement(FoundationLogo, {
        className: 'w-20 h-20 text-foreground-200',
      }));
    },
  },
  ai: {
    id: 'ai',
    name: 'AI',
    description: 'Elements for AI-powered features and interactive chat interfaces.',
    tags: ['ai', 'chat', 'interactive'],
    elements: ['chat', 'chainofthought', 'aichatinput'],
    layout: {
      columnSpan: 2,
      rowSpan: 1,
    },
    getPreview: () => {
      return () => React.createElement('div', {
        className: 'flex items-center justify-center h-full w-full',
      }, React.createElement(AILogo, {
        className: 'w-20 h-20 text-foreground-200',
      }));
    },
  },
  documentation: {
    id: 'documentation',
    name: 'Documentation',
    description: 'Elements for documentation content including tables of contents and navigation.',
    tags: ['documentation', 'reference', 'content'],
    elements: ['toc', 'copypage', 'nextarticle'],
    layout: {
      columnSpan: 2,
      rowSpan: 1,
    },
    getPreview: () => {
      return () => React.createElement('div', {
        className: 'flex items-center justify-center h-full w-full',
      }, React.createElement(DocumentationLogo, {
        className: 'w-20 h-20 text-foreground-200',
      }));
    },
  },
};

export const getPackageById = (id: string) => elementPackages[id];

export const getAllPackages = () => Object.values(elementPackages);

export const getElementsInPackage = (packageId: string): string[] => {
  const pkg = elementPackages[packageId];
  return pkg ? pkg.elements : [];
};

export const getPackageForElement = (elementId: string): string | null => {
  for (const [pkgId, pkg] of Object.entries(elementPackages)) {
    if (pkg.elements.includes(elementId)) return pkgId;
  }
  return null;
};
