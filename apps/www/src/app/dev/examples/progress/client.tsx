"use client";

import { useState, useEffect } from "react";

import { Progress, Flex, Button } from "ui-lab-components";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function FileUploadPreview() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (progress >= 100) { setRunning(false); return; }
    const t = setTimeout(() => setProgress((p) => Math.min(p + Math.random() * 12, 100)), 200);
    return () => clearTimeout(t);
  }, [running, progress]);

  const reset = () => { setProgress(0); setRunning(false); };

  return (
    <Flex direction="column" gap="md" style={{ width: 340 }}>
      <Flex direction="column" gap="xs">
        <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground-muted)" }}>
          report-q4-2025.pdf
        </span>
        <Progress value={progress} label="Uploading" showValue />
      </Flex>
      <Flex gap="sm">
        <Button variant="primary" onClick={() => setRunning(true)} disabled={running || progress === 100}>
          {progress === 100 ? "Done" : "Upload"}
        </Button>
        <Button variant="ghost" onClick={reset}>Reset</Button>
      </Flex>
    </Flex>
  );
}

function StorageQuotaPreview() {
  const used = 7.4;
  const total = 10;

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

function OnboardingStepsPreview() {
  const steps = ["Profile", "Preferences", "Integrations", "Invite team"];
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

function IndeterminatePreview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      <Flex direction="column" gap="xs">
        <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground-muted)" }}>
          {loading ? "Fetching results…" : "Results loaded"}
        </span>
        <Progress indeterminate={loading} value={loading ? 0 : 100} />
      </Flex>
      <Button variant="ghost" onClick={() => setLoading(true)} disabled={loading}>
        Reload
      </Button>
    </Flex>
  );
}

function SkillLevelsPreview() {
  const skills = [
    { name: "TypeScript", value: 92 },
    { name: "Rust", value: 54 },
    { name: "Go", value: 38 },
  ];

  return (
    <Flex direction="column" gap="sm" style={{ width: 300 }}>
      {skills.map((s) => (
        <Progress key={s.name} value={s.value} label={s.name} showValue />
      ))}
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "file-upload",
    title: "File Upload",
    description: "Simulated upload progress with a label and live percentage — starts on button click.",
    preview: <FileUploadPreview />,
  },
  {
    id: "storage-quota",
    title: "Storage Quota",
    description: "Fixed progress bar showing disk usage relative to a custom max value.",
    preview: <StorageQuotaPreview />,
  },
  {
    id: "onboarding-steps",
    title: "Onboarding Steps",
    description: "Step tracker using value/max to represent wizard completion.",
    preview: <OnboardingStepsPreview />,
  },
  {
    id: "indeterminate",
    title: "Indeterminate Loading",
    description: "Animated bar for unknown-duration operations — switches to complete when done.",
    preview: <IndeterminatePreview />,
  },
  {
    id: "skill-levels",
    title: "Skill Levels",
    description: "Stacked progress bars in a profile or stats context with labels and values.",
    preview: <SkillLevelsPreview />,
  },
];

export default function ProgressExamplesPage() {
  return (
    <DevExampleLayout
      title="Progress Examples"
      description="Real-world progress patterns: uploads, quotas, step wizards, indeterminate loading, and stat lists."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
