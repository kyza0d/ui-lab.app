import type { StarterMetadata, LayoutConfig } from 'ui-lab-registry';
import { getStarterLayoutConfig } from './starter-layout-config';
import { createMetadataLayoutGetter } from '@/shared/lib/layout-utils';

export const getLayoutConfig = createMetadataLayoutGetter<StarterMetadata>(getStarterLayoutConfig);
