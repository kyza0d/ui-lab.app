import { Expand, Flex, Badge } from 'ui-lab-components';
import { FaUser } from 'react-icons/fa6';

export const metadata = {
  title: 'Custom Trigger',
  description: 'Compound mode with a fully composed trigger — custom icon, badge, and layout.',
};

export default function Example() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm">
      <Expand>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaUser className="text-foreground-400 text-xs shrink-0" />
            <span className="text-sm font-medium">Account Settings</span>
            <Badge className="ml-auto mr-2">New</Badge>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <Flex direction="column" gap="xs" className="px-3 py-3">
            <p className="text-sm text-foreground-400">Manage your profile, password, and notification preferences.</p>
          </Flex>
        </Expand.Content>
      </Expand>
    </div>
  );
}
