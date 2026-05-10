import { Anchor } from 'ui-lab-components';

export const metadata = {
  title: 'Inline Text',
  description: 'Anchor used inline within a paragraph — the primary use case for navigational links.',
};

export default function Example() {
  return (
    <p className="text-sm text-foreground max-w-prose leading-relaxed">
      Read the{" "}
      <Anchor href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a">
        MDN documentation
      </Anchor>{" "}
      for a full reference on anchor semantics, or check the{" "}
      <Anchor href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html">
        WCAG link purpose guidelines
      </Anchor>{" "}
      for accessibility requirements.
    </p>
  );
}
