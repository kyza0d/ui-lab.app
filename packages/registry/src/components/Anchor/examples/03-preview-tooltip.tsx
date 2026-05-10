import { Anchor, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Preview Tooltip',
  description: 'Hover over the links to see a tooltip preview — composed via the preview prop or Anchor.Preview.',
};

export default function Example() {
  return (
    <Flex gap="lg" align="center">
      <Anchor
        href="https://github.com"
        preview={
          <span className="text-xs text-foreground-400">github.com</span>
        }
      >
        GitHub
      </Anchor>
      <Anchor href="https://vercel.com">
        <Anchor.Preview>
          <span className="text-xs text-foreground-400">vercel.com</span>
        </Anchor.Preview>
        Vercel
      </Anchor>
    </Flex>
  );
}
