import { generatedComponentDependencies, generatedCoreNpmDependencies } from 'ui-lab-registry'
import type { ResolvedDependencies, ConflictInfo } from '../types/index.js'

export class DependencyResolver {
  private getComponentDeps(componentId: string) {
    return generatedComponentDependencies[componentId]
  }

  private getComponentsForNpmPackage(npmPackage: string): string[] {
    const map: Record<string, string[]> = {}
    Object.entries(generatedComponentDependencies).forEach(([componentId, deps]) => {
      deps.npm.forEach(pkg => {
        if (!map[pkg]) {
          map[pkg] = []
        }
        map[pkg].push(componentId)
      })
    })
    return map[npmPackage] ?? []
  }

  resolve(componentIds: string[]): ResolvedDependencies {
    const visited = new Set<string>()
    const npmDeps = new Map<string, string>()
    const allComponents: string[] = []
    const conflicts: ConflictInfo[] = []

    const traverse = (id: string) => {
      if (visited.has(id)) return
      visited.add(id)

      const deps = this.getComponentDeps(id)
      if (!deps) return

      deps.npm.forEach(pkg => {
        if (!npmDeps.has(pkg)) {
          npmDeps.set(pkg, 'latest')
        }
      })

      deps.internal.forEach(traverse)

      allComponents.push(id)
    }

    componentIds.forEach(traverse)

    generatedCoreNpmDependencies.forEach(pkg => {
      if (!npmDeps.has(pkg)) {
        npmDeps.set(pkg, 'latest')
      }
    })

    const npmPackages = Array.from(npmDeps.entries()).map(([name, version]) => {
      const components = this.getComponentsForNpmPackage(name)
      // Only annotate if this package belongs to specific components
      // Core packages like clsx and class-variance-authority are shared utilities
      return {
        name,
        version,
        ...(components.length > 0 && { components })
      }
    })

    return {
      npmPackages,
      internalComponents: allComponents,
      hasConflicts: conflicts.length > 0,
      conflicts
    }
  }

  getDirectDependencies(componentId: string): string[] {
    const deps = this.getComponentDeps(componentId)
    return deps?.internal ?? []
  }

  getNpmDependencies(componentId: string): string[] {
    const deps = this.getComponentDeps(componentId)
    return deps?.npm ?? []
  }

  detectCircularDependencies(componentIds: string[]): string[][] {
    const cycles: string[][] = []
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const path: string[] = []

    const dfs = (id: string): boolean => {
      visited.add(id)
      recursionStack.add(id)
      path.push(id)

      const deps = this.getComponentDeps(id)
      if (deps) {
        for (const dep of deps.internal) {
          if (!visited.has(dep)) {
            if (dfs(dep)) return true
          } else if (recursionStack.has(dep)) {
            const cycleStart = path.indexOf(dep)
            cycles.push([...path.slice(cycleStart), dep])
            return true
          }
        }
      }

      path.pop()
      recursionStack.delete(id)
      return false
    }

    for (const id of componentIds) {
      if (!visited.has(id)) {
        dfs(id)
      }
    }

    return cycles
  }

  topologicalSort(componentIds: string[]): string[] {
    const visited = new Set<string>()
    const result: string[] = []

    const visit = (id: string) => {
      if (visited.has(id)) return
      visited.add(id)

      const deps = this.getComponentDeps(id)
      if (deps) {
        deps.internal.forEach(visit)
      }

      result.push(id)
    }

    componentIds.forEach(visit)
    return result
  }

  getInstallationPlan(componentIds: string[]): {
    requested: string[]
    components: string[]
    dependencies: string[]
    npmPackages: Array<{ name: string; version: string; components?: string[] }>
    order: string[]
  } {
    const resolved = this.resolve(componentIds)
    const order = this.topologicalSort(resolved.internalComponents)
    const dependencies = resolved.internalComponents.filter(c => !componentIds.includes(c))

    return {
      requested: componentIds,
      components: resolved.internalComponents,
      dependencies,
      npmPackages: resolved.npmPackages,
      order
    }
  }

  getAllAvailableComponents(): string[] {
    return Object.keys(generatedComponentDependencies)
  }
}

export function createDependencyResolver(): DependencyResolver {
  return new DependencyResolver()
}
