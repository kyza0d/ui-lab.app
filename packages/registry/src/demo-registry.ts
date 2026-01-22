import dynamic from 'next/dynamic';
import type React from 'react';

export type DemoComponent = React.ComponentType<object>;

// Cached element demos - dynamic() called ONCE at module load
export const elementDemoMap: Record<string, DemoComponent> = {
  'header-basic': dynamic(() => import('./elements/Header/variations/01-basic').then(m => ({ default: m.BasicHeader }))),
  'page-basic': dynamic(() => import('./elements/Page/variations/01-basic').then(m => ({ default: m.BasicPage }))),
  'sidebar-basic': dynamic(() => import('./elements/Sidebar/variations/01-basic').then(m => ({ default: m.BasicSidebar }))),
};

// Cached section previews - dynamic() called ONCE at module load
export const sectionPreviewMap: Record<string, DemoComponent> = {
  cta: dynamic(() => import('./sections/CTA').then(mod => ({ default: () => mod.getPreview() }))),
  'cta-banner': dynamic(() => import('./sections/CTA/variations/01-banner').then(m => ({ default: m.BannerCTA }))),
  'cta-split': dynamic(() => import('./sections/CTA/variations/02-split').then(m => ({ default: m.SplitCTA }))),
  features: dynamic(() => import('./sections/Features').then(mod => ({ default: () => mod.getPreview() }))),
  'features-grid': dynamic(() => import('./sections/Features/variations/01-grid').then(m => ({ default: m.GridFeatures }))),
  'features-list': dynamic(() => import('./sections/Features/variations/02-list').then(m => ({ default: m.FeatureList }))),
  hero: dynamic(() => import('./sections/Hero').then(mod => ({ default: () => mod.getPreview() }))),
  'hero-simple': dynamic(() => import('./sections/Hero/variations/01-simple').then(m => ({ default: m.SimpleHero }))),
  'hero-with-cta': dynamic(() => import('./sections/Hero/variations/02-with-cta').then(m => ({ default: m.HeroWithCTA }))),
  'hero-with-stats': dynamic(() => import('./sections/Hero/variations/03-with-stats').then(m => ({ default: m.HeroWithStats }))),
  'hero-with-features': dynamic(() => import('./sections/Hero/variations/04-with-features').then(m => ({ default: m.HeroWithFeatures }))),
  pricing: dynamic(() => import('./sections/Pricing').then(mod => ({ default: () => mod.getPreview() }))),
  'pricing-cards': dynamic(() => import('./sections/Pricing/variations/01-cards').then(m => ({ default: m.PricingCards }))),
  'pricing-comparison': dynamic(() => import('./sections/Pricing/variations/02-comparison').then(m => ({ default: m.PricingComparison }))),
  testimonials: dynamic(() => import('./sections/Testimonials').then(mod => ({ default: () => mod.getPreview() }))),
  'testimonials-cards': dynamic(() => import('./sections/Testimonials/variations/01-cards').then(m => ({ default: m.CardTestimonials }))),
  'testimonials-featured': dynamic(() => import('./sections/Testimonials/variations/02-featured').then(m => ({ default: m.FeaturedTestimonial }))),
};

// Getter for element demos - returns cached dynamic component
export function getElementDemo(demoPath: string): DemoComponent | null {
  return elementDemoMap[demoPath] || null;
}

// Getter for section previews - returns cached dynamic component
export function getSectionPreview(sectionId: string): DemoComponent | null {
  return sectionPreviewMap[sectionId] || null;
}
