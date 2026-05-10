"use client";

import { useState } from "react";

import { TextArea, Flex, Button } from "ui-lab-components";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function FeedbackFormPreview() {
  const [value, setValue] = useState("");

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        placeholder="Tell us what you think..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCharacterCount
        maxCharacters={300}
        rows={4}
      />
      <Button variant="primary" disabled={value.trim().length === 0} className="self-end">
        Submit
      </Button>
    </Flex>
  );
}

function BioSettingsPreview() {
  const [bio, setBio] = useState("UI designer & developer building minimal tools.");

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        showCharacterCount
        maxCharacters={160}
        rows={3}
        resizable={false}
      />
      <Flex justify="end" gap="sm">
        <Button size="sm" variant="ghost" onClick={() => setBio("")}>Clear</Button>
        <Button size="sm" variant="primary">Save</Button>
      </Flex>
    </Flex>
  );
}

function ErrorStatePreview() {
  const [value, setValue] = useState("");
  const hasError = value.trim().length > 0 && value.trim().length < 20;

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        placeholder="Describe the issue in detail..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={hasError}
        rows={4}
      />
      {hasError && (
        <span style={{ fontSize: "0.75rem", color: "var(--color-destructive)" }}>
          Description must be at least 20 characters.
        </span>
      )}
    </Flex>
  );
}

function DisabledReadonlyPreview() {
  return (
    <Flex direction="column" gap="md" style={{ width: 380 }}>
      <TextArea
        value="This field is disabled and cannot be edited."
        disabled
        rows={2}
        resizable={false}
      />
      <TextArea
        value="This is a read-only note visible to all team members."
        readOnly
        rows={2}
        resizable={false}
      />
    </Flex>
  );
}

function ScrollingPreview() {
  const [value, setValue] = useState(
    "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8"
  );

  return (
    <Flex direction="column" gap="sm" style={{ width: 380 }}>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxHeight="120px"
        resizable={false}
      />
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "feedback-form",
    title: "Feedback Form",
    description: "TextArea with a character limit and submit button — disabled until the user types.",
    preview: <FeedbackFormPreview />,
  },
  {
    id: "bio-settings",
    title: "Profile Bio",
    description: "Fixed-height settings textarea with a 160-character cap and save/clear actions.",
    preview: <BioSettingsPreview />,
  },
  {
    id: "error-state",
    title: "Validation Error",
    description: "Error styling triggered when the input is non-empty but below a minimum length.",
    preview: <ErrorStatePreview />,
  },
  {
    id: "disabled-readonly",
    title: "Disabled & Read-only",
    description: "Side-by-side disabled and read-only states to compare their visual treatment.",
    preview: <DisabledReadonlyPreview />,
  },
  {
    id: "scrolling",
    title: "Scrollable with maxHeight",
    description: "TextArea bounded by a max height — content scrolls once it overflows.",
    preview: <ScrollingPreview />,
  },
];

export default function TextAreaExamplesPage() {
  return (
    <DevExampleLayout
      title="TextArea Examples"
      description="Real-world textarea patterns: forms, settings, validation, and overflow."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
