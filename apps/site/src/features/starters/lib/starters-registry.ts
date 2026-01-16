import {
  StarterMetadata,
  StarterUseCase,
  StarterFramework,
  StarterFeature,
  StarterComplexity,
} from './starters-types';

export const startersRegistry: StarterMetadata[] = [];

export function getStartersByUseCase(
  useCase: StarterUseCase,
  starters: StarterMetadata[] = startersRegistry
): StarterMetadata[] {
  return starters.filter((starter) => starter.useCase === useCase);
}

export function getStartersByFramework(
  framework: StarterFramework,
  starters: StarterMetadata[] = startersRegistry
): StarterMetadata[] {
  return starters.filter((starter) => starter.frameworks.includes(framework));
}

export function getStartersByFeatures(
  feature: StarterFeature,
  starters: StarterMetadata[] = startersRegistry
): StarterMetadata[] {
  return starters.filter((starter) => starter.features.includes(feature));
}

export function getFeaturedStarters(
  starters: StarterMetadata[] = startersRegistry
): StarterMetadata[] {
  return starters.filter((starter) => starter.featured);
}

export function getStarterById(
  id: string,
  starters: StarterMetadata[] = startersRegistry
): StarterMetadata | undefined {
  return starters.find((starter) => starter.id === id);
}

export function getUniqueCategoriesByUseCase(
  starters: StarterMetadata[] = startersRegistry
): Array<{ id: StarterUseCase; label: string; count: number }> {
  const seen = new Set<StarterUseCase>();
  const categories: Array<{ id: StarterUseCase; label: string; count: number }> = [];

  const useCaseLabels: Record<StarterUseCase, string> = {
    [StarterUseCase.LANDING_PAGE]: 'Landing Pages',
    [StarterUseCase.SAAS]: 'SaaS Applications',
    [StarterUseCase.DASHBOARD]: 'Dashboards',
    [StarterUseCase.BLOG]: 'Blogs',
    [StarterUseCase.ECOMMERCE]: 'E-Commerce',
    [StarterUseCase.MOBILE_APP]: 'Mobile Apps',
    [StarterUseCase.API_BACKEND]: 'API Backends',
    [StarterUseCase.PORTFOLIO]: 'Portfolios',
  };

  for (const starter of starters) {
    if (!seen.has(starter.useCase)) {
      seen.add(starter.useCase);
      const count = getStartersByUseCase(starter.useCase, starters).length;
      categories.push({
        id: starter.useCase,
        label: useCaseLabels[starter.useCase],
        count,
      });
    }
  }

  return categories;
}

export function getUniqueCategoriesByFramework(
  starters: StarterMetadata[] = startersRegistry
): Array<{ id: StarterFramework; label: string; count: number }> {
  const seen = new Set<StarterFramework>();
  const categories: Array<{ id: StarterFramework; label: string; count: number }> = [];

  const frameworkLabels: Record<StarterFramework, string> = {
    [StarterFramework.NEXTJS]: 'Next.js',
    [StarterFramework.VITE_REACT]: 'Vite + React',
    [StarterFramework.ASTRO]: 'Astro',
    [StarterFramework.SVELTEKIT]: 'SvelteKit',
    [StarterFramework.REMIX]: 'Remix',
  };

  for (const starter of starters) {
    for (const framework of starter.frameworks) {
      if (!seen.has(framework)) {
        seen.add(framework);
        const count = getStartersByFramework(framework, starters).length;
        categories.push({
          id: framework,
          label: frameworkLabels[framework],
          count,
        });
      }
    }
  }

  return categories;
}

export function getUniqueCategoriesByFeatures(
  starters: StarterMetadata[] = startersRegistry
): Array<{ id: StarterFeature; label: string; count: number }> {
  const seen = new Set<StarterFeature>();
  const categories: Array<{ id: StarterFeature; label: string; count: number }> = [];

  const featureLabels: Record<StarterFeature, string> = {
    [StarterFeature.AUTH]: 'Authentication',
    [StarterFeature.DATABASE]: 'Database',
    [StarterFeature.PAYMENTS]: 'Payments',
    [StarterFeature.CMS]: 'CMS',
    [StarterFeature.STYLING]: 'Styling',
    [StarterFeature.ORM]: 'ORM',
  };

  for (const starter of starters) {
    for (const feature of starter.features) {
      if (!seen.has(feature)) {
        seen.add(feature);
        const count = getStartersByFeatures(feature, starters).length;
        categories.push({
          id: feature,
          label: featureLabels[feature],
          count,
        });
      }
    }
  }

  return categories;
}
