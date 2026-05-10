import { Banner, Button, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Settings Panel',
  description: 'A small warning banner inline with a destructive settings action.',
};

export default function Example() {
  return (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      <div>
        <p className="text-sm font-semibold text-foreground-100">API Access</p>
        <p className="text-xs text-foreground-400">Manage keys for external integrations.</p>
      </div>
      <Banner variant="warning">
        <Banner.Body>Regenerating your key will revoke all existing integrations immediately.</Banner.Body>
      </Banner>
      <Button variant="secondary">Regenerate API key</Button>
    </Flex>
  );
}
