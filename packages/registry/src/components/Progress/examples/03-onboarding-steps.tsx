"use client";

import { useState } from 'react';
import { Progress, Flex, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Onboarding Steps',
  description: 'Step tracker using value/max to represent wizard completion.'
};

const steps = ["Profile", "Preferences", "Integrations", "Invite team"];

export default function Example() {
  const [step, setStep] = useState(1);

  return (
    <Flex direction="column" gap="md" style={{ width: 340 }}>
      <Flex direction="column" gap="xs">
        <Progress value={step} max={steps.length} />
        <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground-muted)" }}>
          Step {step} of {steps.length} — {steps[step - 1]}
        </span>
      </Flex>
      <Flex gap="sm">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
          Back
        </Button>
        <Button variant="primary" onClick={() => setStep((s) => Math.min(steps.length, s + 1))} disabled={step === steps.length}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
