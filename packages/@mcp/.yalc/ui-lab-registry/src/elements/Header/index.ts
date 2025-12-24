import metadata from './metadata.json';
import variationsGenerated from './variations.generated.json';
import type { ElementMetadata } from '../../types';
import { BasicHeader } from './variations/01-basic';
import { HeaderWithActions } from './variations/02-with-actions';

const header: ElementMetadata = {
  id: metadata.id,
  name: metadata.name,
  description: metadata.description,
  category: metadata.category as 'layout' | 'form' | 'navigation' | 'content' | 'card' | 'other',
  tags: metadata.tags,
  variants: [
    {
      name: variationsGenerated['01-basic'].name,
      description: variationsGenerated['01-basic'].description,
      demoPath: variationsGenerated['01-basic'].demoPath,
      files: variationsGenerated['01-basic'].files,
    },
    {
      name: variationsGenerated['02-with-actions'].name,
      description: variationsGenerated['02-with-actions'].description,
      demoPath: variationsGenerated['02-with-actions'].demoPath,
      files: variationsGenerated['02-with-actions'].files,
    },
  ],
  componentDependencies: ['react-icons'],
};

export const demoComponents = {
  'header-basic': BasicHeader,
  'header-actions': HeaderWithActions,
};

export { metadata, BasicHeader, HeaderWithActions };
export default header;
