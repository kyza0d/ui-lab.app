import { ElementsSidebar } from '@/components/elements/ElementsSidebar';
import { elementsList } from 'ui-lab-registry';

export default function SidebarSlot() {
  return <ElementsSidebar elements={elementsList} />;
}
