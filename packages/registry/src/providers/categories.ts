import type { ProviderCategoryDefinition } from '../types.js'

export const providerCategories: Record<string, ProviderCategoryDefinition> = {
  theme: {
    id: 'theme',
    name: 'Theme Providers',
    label: 'Theme',
    description: 'Providers for managing application theming and color modes',
    iconName: 'palette',
  },
  auth: {
    id: 'auth',
    name: 'Authentication Providers',
    label: 'Auth',
    description: 'Providers for managing user authentication and authorization',
    iconName: 'lock',
  },
  state: {
    id: 'state',
    name: 'State Management Providers',
    label: 'State',
    description: 'Providers for managing application state and data',
    iconName: 'database',
  },
  data: {
    id: 'data',
    name: 'Data Providers',
    label: 'Data',
    description: 'Providers for fetching and managing data',
    iconName: 'server',
  },
  routing: {
    id: 'routing',
    name: 'Routing Providers',
    label: 'Routing',
    description: 'Providers for managing navigation and routing',
    iconName: 'route',
  },
  other: {
    id: 'other',
    name: 'Other Providers',
    label: 'Other',
    description: 'Other utility providers',
    iconName: 'puzzle',
  },
} as const
