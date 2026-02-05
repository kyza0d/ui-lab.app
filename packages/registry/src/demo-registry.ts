import dynamic from 'next/dynamic';
import type React from 'react';

export type DemoComponent = React.ComponentType<object>;

// Cached element demos - dynamic() called ONCE at module load
export const elementDemoMap: Record<string, DemoComponent> = {
  'aichatinput-basic': dynamic(() => import('./elements/AI/AIChatInput/variations/01-basic').then(m => ({ default: m.BasicAIChatInput }))),
  'aichatinput-with-suggestions': dynamic(() => import('./elements/AI/AIChatInput/variations/02-with-suggestions').then(m => ({ default: m.AIChatInputWithSuggestions }))),
  'chainofthought-basic': dynamic(() => import('./elements/AI/ChainOfThought/variations/01-basic').then(m => ({ default: m.BasicChainOfThought }))),
  'chainofthought-with-details': dynamic(() => import('./elements/AI/ChainOfThought/variations/02-with-details').then(m => ({ default: m.ChainOfThoughtWithDetails }))),
  'chat-basic': dynamic(() => import('./elements/AI/Chat/variations/01-basic').then(m => ({ default: m.BasicChat }))),
  'chat-with-actions': dynamic(() => import('./elements/AI/Chat/variations/02-with-actions').then(m => ({ default: m.ChatWithActions }))),
  'copypage-basic': dynamic(() => import('./elements/Documentation/CopyPage/variations/01-basic').then(m => ({ default: m.BasicCopyPage }))),
  'copypage-with-success': dynamic(() => import('./elements/Documentation/CopyPage/variations/02-with-success').then(m => ({ default: m.CopyPageWithSuccess }))),
  'nextarticle-basic': dynamic(() => import('./elements/Documentation/NextArticle/variations/01-basic').then(m => ({ default: m.BasicNextArticle }))),
  'nextarticle-with-icon': dynamic(() => import('./elements/Documentation/NextArticle/variations/02-with-icon').then(m => ({ default: m.NextArticleWithIcon }))),
  'toc-basic': dynamic(() => import('./elements/Documentation/TOC/variations/01-basic').then(m => ({ default: m.BasicTOC }))),
  'toc-expanded': dynamic(() => import('./elements/Documentation/TOC/variations/02-expanded').then(m => ({ default: m.ExpandedTOC }))),
  'carousel-basic': dynamic(() => import('./elements/Elements/Carousel/variations/01-basic').then(m => ({ default: m.BasicCarousel }))),
  'rating-basic': dynamic(() => import('./elements/Elements/Rating/variations/01-basic').then(m => ({ default: m.BasicRating }))),
  'timeline-basic': dynamic(() => import('./elements/Elements/Timeline/variations/01-basic').then(m => ({ default: m.BasicTimeline }))),
  'treeview-basic': dynamic(() => import('./elements/Elements/TreeView/variations/01-basic').then(m => ({ default: m.BasicTreeView }))),
  'header-basic': dynamic(() => import('./elements/foundation/Header/variations/01-basic').then(m => ({ default: m.BasicHeader }))),
  'page-basic': dynamic(() => import('./elements/foundation/Page/variations/01-basic').then(m => ({ default: m.BasicPage }))),
  'sidebar-basic': dynamic(() => import('./elements/foundation/Sidebar/variations/01-basic').then(m => ({ default: m.BasicSidebar }))),
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
