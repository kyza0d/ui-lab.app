import { Expand, Flex } from 'ui-lab-components';
import { FaCircleInfo } from 'react-icons/fa6';

export const metadata = {
  title: 'Inline Info',
  description: 'A contextual disclosure pattern for surfacing supplementary information inline.',
};

export default function Example() {
  return (
    <div className="w-full max-w-sm rounded-sm border border-background-700 bg-background-900">
      <Expand>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaCircleInfo className="text-foreground-400 text-xs shrink-0" />
            <span className="text-sm font-medium text-foreground-200">Why do we collect this?</span>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <p className="text-sm text-foreground-400 px-3 py-3 leading-relaxed">
            We use this information only to verify your identity and improve the service. It is never shared with third parties.
          </p>
        </Expand.Content>
      </Expand>
    </div>
  );
}
