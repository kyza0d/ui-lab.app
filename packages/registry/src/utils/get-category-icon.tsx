import { categoryIconConfig } from '../icons-config';
import { categories } from '../categories';
import type { ComponentCategory } from '../types';

// Generate icon map from config
const iconMap = Object.fromEntries(
  Object.entries(categoryIconConfig).map(([, config]) => [
    config.name,
    config.component,
  ])
) as Record<string, React.ComponentType<{ className?: string }>>;

export function getCategoryIcon(categoryId: ComponentCategory): React.ReactNode {
  const category = categories[categoryId];
  if (!category) return null;

  const IconComponent = iconMap[category.iconName];
  if (!IconComponent) return null;

  return <IconComponent className="inline-block w-5 h-5" />;
}
