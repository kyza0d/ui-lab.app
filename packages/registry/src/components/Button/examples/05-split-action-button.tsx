"use client";

import React, { useState } from 'react'
import { Button, Divider, Select, Badge, Flex } from 'ui-lab-components'
import { FaBox, FaSpinner, FaCheck, FaEllipsisVertical, FaCopy, FaTags, FaTrash } from "react-icons/fa6";

type BulkAction = "archive" | "duplicate" | "tag" | "delete";

const selectedCount = 12;

const bulkActions: Record<BulkAction, {
  label: string;
  loadingLabel: string;
  successLabel: string;
  variant: "primary" | "outline" | "danger";
  icon: React.ReactNode;
}> = {
  archive: {
    label: "Archive",
    loadingLabel: "Archiving...",
    successLabel: "Archived",
    variant: "primary",
    icon: <FaBox />,
  },
  duplicate: {
    label: "Duplicate",
    loadingLabel: "Duplicating...",
    successLabel: "Duplicated",
    variant: "outline",
    icon: <FaCopy />,
  },
  tag: {
    label: "Add Tags",
    loadingLabel: "Applying tags...",
    successLabel: "Tagged",
    variant: "outline",
    icon: <FaTags />,
  },
  delete: {
    label: "Delete",
    loadingLabel: "Deleting...",
    successLabel: "Deleted",
    variant: "danger",
    icon: <FaTrash />,
  },
};

export const metadata = {
  title: 'Split Action Button',
  description: 'A split button for bulk actions with dynamic icons, variants, and async feedback while keeping the primary action easy to repeat.'
};

export default function Example() {
  const [action, setAction] = useState<BulkAction>("archive");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const cfg = bulkActions[action];
  const itemsLabel = `${selectedCount} ${selectedCount === 1 ? "item" : "items"}`;

  const handleExecute = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1500);
  };

  const leftIcon = status === "loading" ? <FaSpinner className="animate-spin" /> : status === "done" ? <FaCheck /> : cfg.icon;
  const label = status === "loading" ? cfg.loadingLabel : status === "done" ? cfg.successLabel : `${cfg.label} ${itemsLabel}`;

  return (
    <Flex gap="xs" className="w-110" align="center">
      <Badge variant="secondary">{selectedCount} selected</Badge>
      <Select className="flex h-10" selectedKey={action} onSelectionChange={(key) => setAction(key as BulkAction)} isDisabled={status !== "idle"}>
        <Button
          onPress={handleExecute}
          variant={cfg.variant}
          size="sm"
          className="w-full rounded-none justify-start"
          isDisabled={status !== "idle" || selectedCount === 0}
          icon={leftIcon}
        >
          {label}
        </Button>
        <Divider orientation="vertical" spacing="none" />
        <Select.Trigger aria-label="Choose a bulk action" />
        <Select.Content>
          <Select.Item value="archive" textValue="Archive" icon={<FaBox className="h-3 w-3" />}>Archive</Select.Item>
          <Select.Item value="duplicate" textValue="Duplicate" icon={<FaCopy className="h-3 w-3" />}>Duplicate</Select.Item>
          <Select.Item value="tag" textValue="Add Tags" icon={<FaTags className="h-3 w-3" />}>Add Tags</Select.Item>
          <Select.Item value="delete" textValue="Delete" icon={<FaTrash className="h-3 w-3" />}>Delete</Select.Item>
        </Select.Content>
      </Select>
      <Button size="icon" variant="outline" icon={<FaEllipsisVertical />} aria-label="More bulk actions" />
    </Flex>
  );
}
