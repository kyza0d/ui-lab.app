import { Expand, Flex } from 'ui-lab-components';
import { FaGear, FaCode } from 'react-icons/fa6';

export const metadata = {
  title: 'Settings Panel',
  description: 'Grouped settings sections using compound mode with icons, dividers, and a list of rows.',
};

export default function Example() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      <Expand defaultExpanded>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaGear className="text-foreground-400 text-xs" />
            <span className="text-sm font-medium">General</span>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <Flex direction="column" className="divide-y divide-background-700">
            {['Language', 'Timezone', 'Date format'].map((setting) => (
              <Flex key={setting} justify="between" align="center" className="px-3 py-2.5">
                <span className="text-sm text-foreground-300">{setting}</span>
                <span className="text-xs text-foreground-500">Auto</span>
              </Flex>
            ))}
          </Flex>
        </Expand.Content>
      </Expand>
      <Expand>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaCode className="text-foreground-400 text-xs" />
            <span className="text-sm font-medium">Developer</span>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <Flex direction="column" className="divide-y divide-background-700">
            {['API keys', 'Webhooks', 'Debug mode'].map((setting) => (
              <Flex key={setting} justify="between" align="center" className="px-3 py-2.5">
                <span className="text-sm text-foreground-300">{setting}</span>
                <span className="text-xs text-foreground-500">Off</span>
              </Flex>
            ))}
          </Flex>
        </Expand.Content>
      </Expand>
    </div>
  );
}
