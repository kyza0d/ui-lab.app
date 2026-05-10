"use client";

import { useState } from 'react';
import { Banner, Button, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Form Feedback',
  description: 'Banners shown conditionally after a form action to relay success or failure.',
};

export default function Example() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!submitted) {
      setError(true);
      return;
    }
    setError(false);
  };

  return (
    <Flex direction="column" gap="md" style={{ width: 400 }}>
      {error && (
        <Banner variant="danger" isDismissible onDismiss={() => setError(false)}>
          <Banner.Title>Submission failed</Banner.Title>
          <Banner.Body>Please review the form and correct any errors before retrying.</Banner.Body>
        </Banner>
      )}
      {submitted && !error && (
        <Banner variant="success">
          <Banner.Title>Profile updated</Banner.Title>
          <Banner.Body>Your changes have been saved successfully.</Banner.Body>
        </Banner>
      )}
      <Flex gap="sm">
        <Button variant="primary" onClick={() => { setSubmitted(true); setError(false); }}>
          Save changes
        </Button>
        <Button variant="secondary" onClick={() => { setSubmitted(false); handleSubmit(); }}>
          Trigger error
        </Button>
      </Flex>
    </Flex>
  );
}
