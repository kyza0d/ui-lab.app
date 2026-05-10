import { Banner, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Body Only',
  description: 'Single-line banners without a title for compact inline notifications.',
};

export default function Example() {
  return (
    <Flex direction="column" gap="md" style={{ width: 480 }}>
      <Banner variant="info" isDismissible>
        <Banner.Body>
          Two-factor authentication is not enabled on your account.{' '}
          <a href="#" className="underline">Enable now</a>
        </Banner.Body>
      </Banner>
      <Banner variant="success" isDismissible>
        <Banner.Body>Deployment #142 completed in 38 seconds.</Banner.Body>
      </Banner>
    </Flex>
  );
}
