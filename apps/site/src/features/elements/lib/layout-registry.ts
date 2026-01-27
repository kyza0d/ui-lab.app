import type { ElementMetadata, LayoutConfig } from 'ui-lab-registry';
import { getElementLayoutConfig } from './element-layout-config';
import { createMetadataLayoutGetter } from '@/shared/lib/layout-utils';

export const getLayoutConfig = createMetadataLayoutGetter<ElementMetadata>(getElementLayoutConfig);
