import type { ComponentDeps } from './types.js'

/**
 * Component dependency metadata
 * Specifies which npm packages and internal components each component requires
 */
export const componentDependencies: Record<string, ComponentDeps> = {
  'badge': { npm: [], internal: [] },
  'breadcrumbs': { npm: [], internal: [] },
  'button': { npm: [], internal: [] },
  'card': { npm: [], internal: [] },
  'checkbox': { npm: [], internal: ['label'] },
  'command': { npm: ['cmdk'], internal: ['card', 'badge', 'divider'] },
  'confirm': { npm: [], internal: ['modal', 'button', 'card'] },
  'divider': { npm: [], internal: [] },
  'flex': { npm: [], internal: [] },
  'fold': { npm: ['gsap', '@gsap/react'], internal: [] },
  'form': { npm: [], internal: ['input', 'label'] },
  'gallery': { npm: [], internal: ['card'] },
  'grid': { npm: [], internal: [] },
  'group': { npm: [], internal: ['button', 'input', 'select'] },
  'input': { npm: [], internal: ['label'] },
  'label': { npm: [], internal: [] },
  'menu': { npm: ['@floating-ui/react-dom'], internal: [] },
  'modal': { npm: [], internal: ['card', 'button'] },
  'popover': { npm: ['@floating-ui/react-dom'], internal: [] },
  'progress': { npm: [], internal: [] },
  'radio': { npm: [], internal: ['label'] },
  'select': { npm: ['@floating-ui/react-dom'], internal: [] },
  'slider': { npm: ['@react-stately/slider'], internal: [] },
  'switch': { npm: ['@react-stately/toggle'], internal: [] },
  'table': { npm: [], internal: ['card'] },
  'tabs': { npm: [], internal: [] },
  'textarea': { npm: [], internal: ['label'] },
  'toast': { npm: [], internal: [] },
  'tooltip': { npm: ['@floating-ui/react-dom'], internal: [] },
  'scrollarea': { npm: [], internal: [] },
}

/**
 * Core npm dependencies required by all components
 * These are installed regardless of which components are chosen
 */
export const coreNpmDependencies = [
  'react-aria',
  'clsx',
  'class-variance-authority',
] as const

/**
 * Peer dependencies required by the project
 */
export const corePeerDependencies = [
  'react',
  'react-dom',
] as const

export function getComponentDeps(componentId: string): ComponentDeps | undefined {
  return componentDependencies[componentId]
}

export function getAllComponentIds(): string[] {
  return Object.keys(componentDependencies)
}

/**
 * Build a reverse mapping from npm packages to the components that use them
 * Used for annotating npm packages in installation plans
 */
export function buildNpmPackageComponentMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {}

  Object.entries(componentDependencies).forEach(([componentId, deps]) => {
    deps.npm.forEach(npmPackage => {
      if (!map[npmPackage]) {
        map[npmPackage] = []
      }
      map[npmPackage].push(componentId)
    })
  })

  return map
}

/**
 * Get the components that depend on a specific npm package
 */
export function getComponentsForNpmPackage(npmPackage: string): string[] {
  return buildNpmPackageComponentMap()[npmPackage] ?? []
}
