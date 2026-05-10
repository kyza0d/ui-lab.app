import { Banner, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Variants',
  description: 'All five semantic variants: note, info, success, warning, and danger.',
};

export default function Example() {
  return (
    <Flex direction="column" gap="md" style={{ width: 480 }}>
      <Banner variant="note">
        <Banner.Title>Note</Banner.Title>
        <Banner.Body>This is a general note with supplementary context.</Banner.Body>
      </Banner>
      <Banner variant="info">
        <Banner.Title>Info</Banner.Title>
        <Banner.Body>Your workspace is on the free plan. Upgrade to unlock more seats.</Banner.Body>
      </Banner>
      <Banner variant="success">
        <Banner.Title>Success</Banner.Title>
        <Banner.Body>Your changes have been saved and are now live.</Banner.Body>
      </Banner>
      <Banner variant="warning">
        <Banner.Title>Warning</Banner.Title>
        <Banner.Body>This action cannot be undone. Proceed with caution.</Banner.Body>
      </Banner>
      <Banner variant="danger">
        <Banner.Title>Danger</Banner.Title>
        <Banner.Body>Your account has exceeded its storage limit.</Banner.Body>
      </Banner>
    </Flex>
  );
}
