export { CardTestimonials } from './01-cards';
export { FeaturedTestimonial } from './02-featured';

export const DEMO_MAP = {
  'testimonials-cards': { key: '01-cards', export: 'CardTestimonials' },
  'testimonials-featured': { key: '02-featured', export: 'FeaturedTestimonial' },
} as const;
