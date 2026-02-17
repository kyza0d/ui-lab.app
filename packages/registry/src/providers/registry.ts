import type { ProviderRegistry } from '../types.js'
import themeMetadata from './Theme/metadata.json' with { type: 'json' }

export const providerRegistry: ProviderRegistry = {
  theme: themeMetadata as any,
}
