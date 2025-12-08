import type { StarterPreset } from '../types';

export const starterPresets: Record<'next' | 'vite' | 'tauri', StarterPreset> = {
  next: {
    templateName: 'next',
    components: [
      'button',
      'input',
      'label',
      'card',
      'badge',
      'toast',
      'modal',
      'tabs',
      'select',
      'checkbox'
    ],
    description: 'Full-featured components for Next.js applications'
  },
  vite: {
    templateName: 'vite',
    components: [
      'button',
      'input',
      'label',
      'card',
      'badge',
      'divider',
      'progress'
    ],
    description: 'Lightweight components for Vite-based applications'
  },
  tauri: {
    templateName: 'tauri',
    components: [
      'button',
      'input',
      'label',
      'card',
      'modal',
      'switch',
      'slider',
      'context-menu'
    ],
    description: 'Desktop-optimized components for Tauri applications'
  }
};

export function getStarterComponents(template: 'next' | 'vite' | 'tauri'): string[] {
  return starterPresets[template].components;
}
