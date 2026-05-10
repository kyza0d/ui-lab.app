import { Progress, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Storage Quota',
  description: 'Fixed progress bar showing disk usage relative to a custom max value.'
};

const used = 7.4;
const total = 10;

export default function Example() {
  return (
    <Flex direction="column" gap="md" style={{ width: 300 }}>
      <Flex direction="column" gap="xs">
        <Progress value={used} max={total} label="Storage" showValue />
        <span style={{ fontSize: "var(--text-xs)", color: "var(--foreground-muted)" }}>
          {used} GB of {total} GB used
        </span>
      </Flex>
    </Flex>
  );
}
