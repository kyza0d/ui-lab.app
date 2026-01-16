export enum StarterUseCase {
  LANDING_PAGE = 'landing-page',
  SAAS = 'saas',
  DASHBOARD = 'dashboard',
  BLOG = 'blog',
  ECOMMERCE = 'ecommerce',
  MOBILE_APP = 'mobile-app',
  API_BACKEND = 'api-backend',
  PORTFOLIO = 'portfolio',
}

export enum StarterFramework {
  NEXTJS = 'nextjs',
  VITE_REACT = 'vite-react',
  ASTRO = 'astro',
  SVELTEKIT = 'sveltekit',
  REMIX = 'remix',
}

export enum StarterFeature {
  AUTH = 'auth',
  DATABASE = 'database',
  PAYMENTS = 'payments',
  CMS = 'cms',
  STYLING = 'styling',
  ORM = 'orm',
}

export enum StarterComplexity {
  MINIMAL = 'minimal',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
}

export interface StarterMetadata {
  id: string;
  name: string;
  description: string;
  useCase: StarterUseCase;
  frameworks: StarterFramework[];
  features: StarterFeature[];
  complexity: StarterComplexity;
  featured: boolean;
}

export type StartersNav = 'featured' | 'all' | 'use-case' | 'framework' | 'features';
