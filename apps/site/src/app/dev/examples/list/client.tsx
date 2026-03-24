"use client";

import React, { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { List, type ListActionDef } from "ui-lab-components";
import {
  Pencil,
  Trash2,
} from "lucide-react";

// ─── 1. Team Members ─────────────────────────────────────────────────────────

const teamMembers = [
  { id: "1", name: "Alice Hartman", role: "Engineering Lead", color: "#6366f1", initials: "AH" },
  { id: "2", name: "Bruno Mendes", role: "Senior Frontend", color: "#0ea5e9", initials: "BM" },
  { id: "3", name: "Clara Novak", role: "Product Designer", color: "#ec4899", initials: "CN" },
  { id: "4", name: "David Park", role: "Backend Engineer", color: "#f59e0b", initials: "DP" },
  { id: "5", name: "Elena Russo", role: "QA Engineer", color: "#10b981", initials: "ER" },
];

function TeamMembersPreview() {
  const [selectedId, setSelectedId] = useState<string | null>("1");

  return (
    <div className="w-80">
      <List>
        {teamMembers.map((member) => {
          const editAction: ListActionDef = {
            icon: <Pencil className="w-4.5 h-4.5" />,
            title: "Edit member",
            onClick: () => { },
          };
          const deleteAction: ListActionDef = {
            icon: <Trash2 className="w-4.5 h-4.5" />,
            title: "Remove member",
            onClick: () => setSelectedId(null),
          };
          return (
            <List.Item
              key={member.id}
              value={member.id}
              interactive
              selected={selectedId === member.id}
              actions={[editAction, deleteAction]}
              onClick={() => setSelectedId(member.id)}
            >
              <List.Media>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
              </List.Media>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-foreground-100 truncate">{member.name}</span>
                <List.Desc>{member.role}</List.Desc>
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "team-members",
    title: "Team Members",
    description: "Contact list with avatar initials, roles, and edit/remove action buttons. Click a row to select it.",
    preview: <TeamMembersPreview />,
    previewLayout: "center",
  },
];

export default function ListExamplesPage() {
  return (
    <DevExampleLayout
      title="List Examples"
      description="Real-world List component configurations: team directories, file browsers, notification feeds, task checklists, and command palettes."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
