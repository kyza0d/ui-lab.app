"use client";

import { useState } from "react";
import { Banner, Button, Flex } from "ui-lab-components";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function VariantsPreview() {
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

function DismissiblePreview() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <Flex direction="column" gap="md" style={{ width: 480 }}>
      {!dismissed ? (
        <Banner variant="info" isDismissible onDismiss={() => setDismissed(true)}>
          <Banner.Title>Scheduled maintenance</Banner.Title>
          <Banner.Body>The system will be unavailable on Saturday from 2–4 AM UTC.</Banner.Body>
        </Banner>
      ) : (
        <Flex gap="sm" style={{ alignItems: "center" }}>
          <span className="text-sm text-foreground-400">Banner dismissed.</span>
          <Button variant="ghost" onClick={() => setDismissed(false)}>
            Restore
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

function FormFeedbackPreview() {
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

function SettingsPanelPreview() {
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

function BodyOnlyPreview() {
  return (
    <Flex direction="column" gap="md" style={{ width: 480 }}>
      <Banner variant="info" isDismissible>
        <Banner.Body>
          Two-factor authentication is not enabled on your account.{" "}
          <a href="#" className="underline">Enable now</a>
        </Banner.Body>
      </Banner>
      <Banner variant="success" isDismissible>
        <Banner.Body>Deployment #142 completed in 38 seconds.</Banner.Body>
      </Banner>
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "variants",
    title: "Variants",
    description: "All five semantic variants: note, info, success, warning, and danger.",
    preview: <VariantsPreview />,
  },
  {
    id: "dismissible",
    title: "Dismissible",
    description: "A banner with a dismiss button. The caller controls what happens after dismissal.",
    preview: <DismissiblePreview />,
  },
  {
    id: "form-feedback",
    title: "Form Feedback",
    description: "Banners shown conditionally after a form action to relay success or failure.",
    preview: <FormFeedbackPreview />,
  },
  {
    id: "settings-panel",
    title: "Settings Panel",
    description: "A small warning banner inline with a destructive settings action.",
    preview: <SettingsPanelPreview />,
  },
  {
    id: "body-only",
    title: "Body Only",
    description: "Single-line banners without a title for compact inline notifications.",
    preview: <BodyOnlyPreview />,
  },
];

export default function BannerExamplesPage() {
  return (
    <DevExampleLayout
      title="Banner Examples"
      description="Minimal banner patterns for variants, dismissal, sizes, form feedback, settings panels, and inline notifications."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
