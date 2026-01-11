import React from 'react';
import { Banner } from 'ui-lab-components';

export const metadata = {
  title: 'Dismissible Banner',
  description: 'A dismissible banner with danger variant. Use this for critical alerts that users can dismiss.'
};

export default function Example() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return <div className="text-foreground-300">Banner dismissed</div>;
  }

  return (
    <Banner
      variant="danger"
      size="md"
      isDismissible={true}
      onDismiss={() => setIsVisible(false)}
    >
      Error: A critical issue has occurred. Please take action.
    </Banner>
  );
}
