import dynamic from 'next/dynamic';
import type React from 'react';

export type DemoComponent = React.ComponentType<object>;

// Lazy-loaded element demos - dynamic() called on demand
const elementDemoLoaders: Record<string, () => DemoComponent> = {
  'aichatinput-basic': () => dynamic(() => import('./elements/AI/AIChatInput/variations/01-basic').then(m => ({ default: m.BasicAIChatInput }))),
  'aichatinput-with-suggestions': () => dynamic(() => import('./elements/AI/AIChatInput/variations/02-with-suggestions').then(m => ({ default: m.AIChatInputWithSuggestions }))),
  'chainofthought-basic': () => dynamic(() => import('./elements/AI/ChainOfThought/variations/01-basic').then(m => ({ default: m.BasicChainOfThought }))),
  'chainofthought-with-details': () => dynamic(() => import('./elements/AI/ChainOfThought/variations/02-with-details').then(m => ({ default: m.ChainOfThoughtWithDetails }))),
  'chat-basic': () => dynamic(() => import('./elements/AI/Chat/variations/01-basic').then(m => ({ default: m.BasicChat }))),
  'chat-with-actions': () => dynamic(() => import('./elements/AI/Chat/variations/02-with-actions').then(m => ({ default: m.ChatWithActions }))),
  'copypage-basic': () => dynamic(() => import('./elements/Documentation/CopyPage/variations/01-basic').then(m => ({ default: m.BasicCopyPage }))),
  'copypage-with-success': () => dynamic(() => import('./elements/Documentation/CopyPage/variations/02-with-success').then(m => ({ default: m.CopyPageWithSuccess }))),
  'nextarticle-basic': () => dynamic(() => import('./elements/Documentation/NextArticle/variations/01-basic').then(m => ({ default: m.BasicNextArticle }))),
  'nextarticle-with-icon': () => dynamic(() => import('./elements/Documentation/NextArticle/variations/02-with-icon').then(m => ({ default: m.NextArticleWithIcon }))),
  'toc-basic': () => dynamic(() => import('./elements/Documentation/TOC/variations/01-basic').then(m => ({ default: m.BasicTOC }))),
  'toc-expanded': () => dynamic(() => import('./elements/Documentation/TOC/variations/02-expanded').then(m => ({ default: m.ExpandedTOC }))),
  'carousel-basic': () => dynamic(() => import('./elements/Elements/Carousel/variations/01-basic').then(m => ({ default: m.BasicCarousel }))),
  'rating-basic': () => dynamic(() => import('./elements/Elements/Rating/variations/01-basic').then(m => ({ default: m.BasicRating }))),
  'timeline-basic': () => dynamic(() => import('./elements/Elements/Timeline/variations/01-basic').then(m => ({ default: m.BasicTimeline }))),
  'treeview-basic': () => dynamic(() => import('./elements/Elements/TreeView/variations/01-basic').then(m => ({ default: m.BasicTreeView }))),
  'header-basic': () => dynamic(() => import('./elements/foundation/Header/variations/01-basic').then(m => ({ default: m.BasicHeader }))),
  'page-basic': () => dynamic(() => import('./elements/foundation/Page/variations/01-basic').then(m => ({ default: m.BasicPage }))),
  'sidebar-basic': () => dynamic(() => import('./elements/foundation/Sidebar/variations/01-basic').then(m => ({ default: m.BasicSidebar }))),
};

// Lazy-loaded section previews - dynamic() called on demand
const sectionPreviewLoaders: Record<string, () => DemoComponent> = {
  cta: () => dynamic(() => import('./sections/CTA').then(mod => ({ default: () => mod.getPreview() }))),
  'cta-banner': () => dynamic(() => import('./sections/CTA/variations/01-banner').then(m => ({ default: m.BannerCTA }))),
  'cta-split': () => dynamic(() => import('./sections/CTA/variations/02-split').then(m => ({ default: m.SplitCTA }))),
  features: () => dynamic(() => import('./sections/Features').then(mod => ({ default: () => mod.getPreview() }))),
  'features-grid': () => dynamic(() => import('./sections/Features/variations/01-grid').then(m => ({ default: m.GridFeatures }))),
  'features-list': () => dynamic(() => import('./sections/Features/variations/02-list').then(m => ({ default: m.FeatureList }))),
  hero: () => dynamic(() => import('./sections/Hero').then(mod => ({ default: () => mod.getPreview() }))),
  'hero-simple': () => dynamic(() => import('./sections/Hero/variations/01-simple').then(m => ({ default: m.SimpleHero }))),
  'hero-with-cta': () => dynamic(() => import('./sections/Hero/variations/02-with-cta').then(m => ({ default: m.HeroWithCTA }))),
  'hero-with-stats': () => dynamic(() => import('./sections/Hero/variations/03-with-stats').then(m => ({ default: m.HeroWithStats }))),
  'hero-with-features': () => dynamic(() => import('./sections/Hero/variations/04-with-features').then(m => ({ default: m.HeroWithFeatures }))),
  pricing: () => dynamic(() => import('./sections/Pricing').then(mod => ({ default: () => mod.getPreview() }))),
  'pricing-cards': () => dynamic(() => import('./sections/Pricing/variations/01-cards').then(m => ({ default: m.PricingCards }))),
  'pricing-comparison': () => dynamic(() => import('./sections/Pricing/variations/02-comparison').then(m => ({ default: m.PricingComparison }))),
  testimonials: () => dynamic(() => import('./sections/Testimonials').then(mod => ({ default: () => mod.getPreview() }))),
  'testimonials-cards': () => dynamic(() => import('./sections/Testimonials/variations/01-cards').then(m => ({ default: m.CardTestimonials }))),
  'testimonials-featured': () => dynamic(() => import('./sections/Testimonials/variations/02-featured').then(m => ({ default: m.FeaturedTestimonial }))),
};

// Lazy-loaded pattern demos - dynamic() called on demand
const patternDemoLoaders: Record<string, () => DemoComponent> = {
  'badge-row': () => dynamic(() => import('./patterns/data/badge-row/variations/main').then(m => ({ default: m.BadgeRowDemo }))),
  'badge-row-mixed': () => dynamic(() => import('./patterns/data/badge-row/variations/mixed').then(m => ({ default: m.BadgeRowMixedDemo }))),
  'badge-row-outline': () => dynamic(() => import('./patterns/data/badge-row/variations/outline').then(m => ({ default: m.BadgeRowOutlineDemo }))),
  'data-table-row': () => dynamic(() => import('./patterns/data/data-table-row/variations/main').then(m => ({ default: m.DataTableRowDemo }))),
  'data-table-row-expandable': () => dynamic(() => import('./patterns/data/data-table-row/variations/expandable').then(m => ({ default: m.DataTableRowExpandableDemo }))),
  'data-table-row-selectable': () => dynamic(() => import('./patterns/data/data-table-row/variations/selectable').then(m => ({ default: m.DataTableRowSelectableDemo }))),
  'progress-metric': () => dynamic(() => import('./patterns/data/progress-metric/variations/main').then(m => ({ default: m.ProgressMetricDemo }))),
  'progress-metric-colored': () => dynamic(() => import('./patterns/data/progress-metric/variations/colored').then(m => ({ default: m.ProgressMetricColoredDemo }))),
  'progress-metric-stacked': () => dynamic(() => import('./patterns/data/progress-metric/variations/stacked').then(m => ({ default: m.ProgressMetricStackedDemo }))),
  'empty-state-pattern': () => dynamic(() => import('./patterns/feedback/empty-state-pattern/variations/main').then(m => ({ default: m.EmptyStateDemo }))),
  'empty-state-minimal': () => dynamic(() => import('./patterns/feedback/empty-state-pattern/variations/minimal').then(m => ({ default: m.EmptyStateMinimalDemo }))),
  'empty-state-with-cta': () => dynamic(() => import('./patterns/feedback/empty-state-pattern/variations/with-cta').then(m => ({ default: m.EmptyStateWithCTADemo }))),
  'inline-alert': () => dynamic(() => import('./patterns/feedback/inline-alert/variations/main').then(m => ({ default: m.InlineAlertDemo }))),
  'inline-alert-error': () => dynamic(() => import('./patterns/feedback/inline-alert/variations/error').then(m => ({ default: m.InlineAlertErrorDemo }))),
  'inline-alert-info': () => dynamic(() => import('./patterns/feedback/inline-alert/variations/info').then(m => ({ default: m.InlineAlertInfoDemo }))),
  'labeled-field': () => dynamic(() => import('./patterns/form/labeled-field/variations/main').then(m => ({ default: m.LabeledFieldDemo }))),
  'labeled-field-with-error': () => dynamic(() => import('./patterns/form/labeled-field/variations/with-error').then(m => ({ default: m.LabeledFieldWithErrorDemo }))),
  'labeled-field-with-hint': () => dynamic(() => import('./patterns/form/labeled-field/variations/with-hint').then(m => ({ default: m.LabeledFieldWithHintDemo }))),
  'search-input': () => dynamic(() => import('./patterns/form/search-input/variations/main').then(m => ({ default: m.SearchInputDemo }))),
  'search-input-bare': () => dynamic(() => import('./patterns/form/search-input/variations/bare').then(m => ({ default: m.SearchInputBareDemo }))),
  'search-input-with-kbd': () => dynamic(() => import('./patterns/form/search-input/variations/with-kbd').then(m => ({ default: m.SearchInputWithKbdDemo }))),
  'select-row': () => dynamic(() => import('./patterns/form/select-row/variations/main').then(m => ({ default: m.SelectRowDemo }))),
  'select-row-inline': () => dynamic(() => import('./patterns/form/select-row/variations/inline').then(m => ({ default: m.SelectRowInlineDemo }))),
  'select-row-with-icon': () => dynamic(() => import('./patterns/form/select-row/variations/with-icon').then(m => ({ default: m.SelectRowWithIconDemo }))),
  'toggle-setting-row': () => dynamic(() => import('./patterns/form/toggle-setting-row/variations/main').then(m => ({ default: m.ToggleSettingRowDemo }))),
  'toggle-setting-row-compact': () => dynamic(() => import('./patterns/form/toggle-setting-row/variations/compact').then(m => ({ default: m.ToggleSettingRowCompactDemo }))),
  'toggle-setting-row-destructive': () => dynamic(() => import('./patterns/form/toggle-setting-row/variations/destructive').then(m => ({ default: m.ToggleSettingRowDestructiveDemo }))),
  'button-group-pattern': () => dynamic(() => import('./patterns/interaction/button-group-pattern/variations/main').then(m => ({ default: m.ButtonGroupPatternDemo }))),
  'button-group-horizontal': () => dynamic(() => import('./patterns/interaction/button-group-pattern/variations/horizontal').then(m => ({ default: m.ButtonGroupHorizontalDemo }))),
  'button-group-icon': () => dynamic(() => import('./patterns/interaction/button-group-pattern/variations/icon').then(m => ({ default: m.ButtonGroupIconDemo }))),
  'icon-action-bar': () => dynamic(() => import('./patterns/interaction/icon-action-bar/variations/main').then(m => ({ default: m.IconActionBarDemo }))),
  'icon-action-bar-compact': () => dynamic(() => import('./patterns/interaction/icon-action-bar/variations/compact').then(m => ({ default: m.IconActionBarCompactDemo }))),
  'icon-action-bar-with-more': () => dynamic(() => import('./patterns/interaction/icon-action-bar/variations/with-more').then(m => ({ default: m.IconActionBarWithMoreDemo }))),
  'tab-content-header': () => dynamic(() => import('./patterns/interaction/tab-content-header/variations/main').then(m => ({ default: m.TabContentHeaderDemo }))),
  'tab-content-header-minimal': () => dynamic(() => import('./patterns/interaction/tab-content-header/variations/minimal').then(m => ({ default: m.TabContentHeaderMinimalDemo }))),
  'tab-content-header-with-badge': () => dynamic(() => import('./patterns/interaction/tab-content-header/variations/with-badge').then(m => ({ default: m.TabContentHeaderWithBadgeDemo }))),
  'media-object': () => dynamic(() => import('./patterns/layout/media-object/variations/main').then(m => ({ default: m.MediaObjectDemo }))),
  'media-object-lg': () => dynamic(() => import('./patterns/layout/media-object/variations/lg').then(m => ({ default: m.MediaObjectLgDemo }))),
  'media-object-sm': () => dynamic(() => import('./patterns/layout/media-object/variations/sm').then(m => ({ default: m.MediaObjectSmDemo }))),
  'split-row': () => dynamic(() => import('./patterns/layout/split-row/variations/main').then(m => ({ default: m.SplitRowDemo }))),
  'split-row-actions': () => dynamic(() => import('./patterns/layout/split-row/variations/actions').then(m => ({ default: m.SplitRowActionsDemo }))),
  'split-row-meta': () => dynamic(() => import('./patterns/layout/split-row/variations/meta').then(m => ({ default: m.SplitRowMetaDemo }))),
  'stat-block': () => dynamic(() => import('./patterns/layout/stat-block/variations/main').then(m => ({ default: m.StatBlockDemo }))),
  'stat-block-compact': () => dynamic(() => import('./patterns/layout/stat-block/variations/compact').then(m => ({ default: m.StatBlockCompactDemo }))),
  'stat-block-with-icon': () => dynamic(() => import('./patterns/layout/stat-block/variations/with-icon').then(m => ({ default: m.StatBlockWithIconDemo }))),
};

// Cached instances
const elementDemoCache = new Map<string, DemoComponent>();
const sectionPreviewCache = new Map<string, DemoComponent>();
const patternDemoCache = new Map<string, DemoComponent>();

// Getter for element demos - lazy-loads and caches
export function getElementDemo(demoPath: string): DemoComponent | null {
  if (!elementDemoLoaders[demoPath]) return null;
  if (!elementDemoCache.has(demoPath)) {
    elementDemoCache.set(demoPath, elementDemoLoaders[demoPath]());
  }
  return elementDemoCache.get(demoPath) || null;
}

// Getter for section previews - lazy-loads and caches
export function getSectionPreview(sectionId: string): DemoComponent | null {
  if (!sectionPreviewLoaders[sectionId]) return null;
  if (!sectionPreviewCache.has(sectionId)) {
    sectionPreviewCache.set(sectionId, sectionPreviewLoaders[sectionId]());
  }
  return sectionPreviewCache.get(sectionId) || null;
}

// Getter for pattern demos - lazy-loads and caches
export function getPatternDemo(patternId: string): DemoComponent | null {
  if (!patternDemoLoaders[patternId]) return null;
  if (!patternDemoCache.has(patternId)) {
    patternDemoCache.set(patternId, patternDemoLoaders[patternId]());
  }
  return patternDemoCache.get(patternId) || null;
}
