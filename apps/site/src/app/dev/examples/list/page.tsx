"use client";

import React, { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { List, Badge, Select, type ListActionDef } from "ui-lab-components";
import {
  Pencil,
  Trash2,
  Download,
  MoreHorizontal,
  Folder,
  FileText,
  FileImage,
  FileCode,
  Archive,
  Terminal,
  Search,
  Settings,
  GitBranch,
  RefreshCw,
  Bell,
  Plus,
  Wifi,
  Moon,
  Volume2,
  Bluetooth,
  Shield,
  Eye,
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
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
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

// ─── 2. File Manager ──────────────────────────────────────────────────────────

const files = [
  { id: "f1", name: "src", ext: "Folder — 12 items", icon: <Folder className="w-6 h-6 text-amber-400" /> },
  { id: "f2", name: "README.md", ext: "Markdown — 4.2 KB", icon: <FileText className="w-6 h-6 text-blue-400" /> },
  { id: "f3", name: "banner.png", ext: "PNG Image — 1.8 MB", icon: <FileImage className="w-6 h-6 text-green-400" /> },
  { id: "f4", name: "index.ts", ext: "TypeScript — 12 KB", icon: <FileCode className="w-6 h-6 text-indigo-400" /> },
  { id: "f5", name: "build", ext: "Folder — 8 items", icon: <Folder className="w-6 h-6 text-amber-400" /> },
  { id: "f6", name: "archive.zip", ext: "ZIP Archive — 34 MB", icon: <Archive className="w-6 h-6 text-orange-400" /> },
];

function FileManagerPreview() {
  return (
    <div className="w-80">
      <List>
        <List.Header>Project Root</List.Header>
        {files.map((file) => {
          const downloadAction: ListActionDef = {
            icon: <Download className="w-4.5 h-4.5" />,
            title: "Download",
            onClick: () => { },
          };
          const moreAction: ListActionDef = {
            icon: <MoreHorizontal className="w-4.5 h-4.5" />,
            title: "More options",
            onClick: () => { },
          };
          return (
            <List.Item
              key={file.id}
              value={file.id}
              interactive
              actions={[downloadAction, moreAction]}
            >
              <List.Media>{file.icon}</List.Media>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-foreground-100 truncate">{file.name}</span>
                <List.Desc>{file.ext}</List.Desc>
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}

// ─── 3. Notification Feed ─────────────────────────────────────────────────────

type Notification = {
  id: string;
  initials: string;
  color: string;
  text: string;
  time: string;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  { id: "n1", initials: "SJ", color: "#6366f1", text: "Sara Jenkins commented on your pull request.", time: "2m ago", unread: true },
  { id: "n2", initials: "TK", color: "#0ea5e9", text: "Tom Kim merged branch feature/auth into main.", time: "14m ago", unread: true },
  { id: "n3", initials: "LM", color: "#ec4899", text: "Luna Martinez mentioned you in #design-review.", time: "1h ago", unread: false },
  { id: "n4", initials: "AJ", color: "#f59e0b", text: "Arjun Joshi assigned issue #482 to you.", time: "3h ago", unread: true },
  { id: "n5", initials: "YW", color: "#10b981", text: "Yuki Watanabe approved your deployment.", time: "5h ago", unread: false },
];

function NotificationFeedPreview() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="w-80">
      <List variant="feed">
        {notifications.map((n) => (
          <List.Item
            key={n.id}
            value={n.id}
            interactive
            onClick={() => markRead(n.id)}
          >
            <List.Media>
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                  style={{ backgroundColor: n.color }}
                >
                  {n.initials}
                </div>
                {n.unread && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-background" />
                )}
              </div>
            </List.Media>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-foreground-100 leading-snug">{n.text}</span>
              <List.Desc>{n.time}</List.Desc>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

// ─── 4. Task Checklist ────────────────────────────────────────────────────────

type Task = {
  id: string;
  label: string;
  priority: "default" | "warning" | "danger" | "success";
  priorityLabel: string;
  checked: boolean;
};

const initialTasks: Task[] = [
  { id: "t1", label: "Set up CI/CD pipeline", priority: "danger", priorityLabel: "Critical", checked: false },
  { id: "t2", label: "Write unit tests for auth module", priority: "warning", priorityLabel: "High", checked: false },
  { id: "t3", label: "Update API documentation", priority: "default", priorityLabel: "Medium", checked: true },
  { id: "t4", label: "Migrate database schema", priority: "danger", priorityLabel: "Critical", checked: false },
  { id: "t5", label: "Review design tokens PR", priority: "success", priorityLabel: "Low", checked: true },
];

function TaskChecklistPreview() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <div className="w-80">
      <List>
        <List.Header>Sprint 12 Tasks</List.Header>
        {tasks.map((task) => (
          <List.Item
            key={task.id}
            value={task.id}
            interactive
            className="flex items-start"
            selected={task.checked}
          >
            <List.Checkbox className="m-0" checked={task.checked} onChange={() => toggle(task.id)} />
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm truncate"
                style={{ color: task.checked ? "var(--foreground-400)" : "var(--foreground-100)", textDecoration: task.checked ? "line-through" : "none" }}
              >
                {task.label}
              </span>
              <List.Desc>
                <Badge variant={task.priority} size="sm">{task.priorityLabel}</Badge>
              </List.Desc>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

// ─── 5. Command Palette ───────────────────────────────────────────────────────

const commands = [
  { id: "c1", label: "Open Terminal", shortcut: "⌃`", icon: <Terminal className="w-6 h-6 text-foreground-400" /> },
  { id: "c2", label: "Quick Search", shortcut: "⌘K", icon: <Search className="w-6 h-6 text-foreground-400" /> },
  { id: "c3", label: "New Branch", shortcut: "⌘⇧B", icon: <GitBranch className="w-6 h-6 text-foreground-400" /> },
  { id: "c4", label: "Open Settings", shortcut: "⌘,", icon: <Settings className="w-6 h-6 text-foreground-400" /> },
  { id: "c5", label: "Reload Window", shortcut: "⌘⇧P", icon: <RefreshCw className="w-6 h-6 text-foreground-400" /> },
  { id: "c6", label: "Show Notifications", shortcut: "⌘⇧N", icon: <Bell className="w-6 h-6 text-foreground-400" /> },
  { id: "c7", label: "New File", shortcut: "⌘N", icon: <Plus className="w-6 h-6 text-foreground-400" /> },
];

function CommandPalettePreview() {
  return (
    <div className="w-80">
      <List>
        <List.Header sticky>Quick Actions</List.Header>
        {commands.map((cmd) => (
          <List.Item key={cmd.id} value={cmd.id} interactive>
            <List.Media>{cmd.icon}</List.Media>
            <span className="text-sm text-foreground-100 flex-1">{cmd.label}</span>
            <Badge className="text-foreground-400">
              {cmd.shortcut}
            </Badge>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

// ─── 6. Settings Panel (Switch) ───────────────────────────────────────────────

type Setting = {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  enabled: boolean;
};

const initialSettings: Setting[] = [
  { id: "s1", label: "Wi-Fi", desc: "Connected to Home Network", icon: <Wifi className="w-6 h-6 text-blue-400" />, enabled: true },
  { id: "s2", label: "Bluetooth", desc: "No devices connected", icon: <Bluetooth className="w-6 h-6 text-foreground-400" />, enabled: false },
  { id: "s3", label: "Do Not Disturb", desc: "Silence calls and alerts", icon: <Moon className="w-6 h-6 text-purple-400" />, enabled: false },
  { id: "s4", label: "Sound", desc: "Volume at 80%", icon: <Volume2 className="w-6 h-6 text-green-400" />, enabled: true },
  { id: "s5", label: "Privacy Mode", desc: "Hide sensitive content", icon: <Eye className="w-6 h-6 text-foreground-400" />, enabled: false },
  { id: "s6", label: "Firewall", desc: "Block unauthorized access", icon: <Shield className="w-6 h-6 text-red-400" />, enabled: true },
];

function SettingsPanelPreview() {
  const [settings, setSettings] = useState<Setting[]>(initialSettings);

  const toggle = (id: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  return (
    <div className="w-80">
      <List>
        <List.Header>System Settings</List.Header>
        {settings.map((s) => (
          <List.Item key={s.id} value={s.id}>
            <List.Media>{s.icon}</List.Media>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-foreground-100 truncate">{s.label}</span>
              <List.Desc>{s.desc}</List.Desc>
            </div>
            <List.Switch isSelected={s.enabled} onChange={() => toggle(s.id)} aria-label={s.label} />
          </List.Item>
        ))}
      </List>
    </div>
  );
}

// ─── 7. Inline Editing (Input) ────────────────────────────────────────────────

type Profile = {
  id: string;
  field: string;
  value: string;
};

const initialProfile: Profile[] = [
  { id: "p1", field: "Display name", value: "Alice Hartman" },
  { id: "p2", field: "Username", value: "aliceh" },
  { id: "p3", field: "Email", value: "alice@company.io" },
  { id: "p4", field: "Location", value: "San Francisco" },
  { id: "p5", field: "Website", value: "alice.dev" },
];

function InlineEditPreview() {
  const [profile, setProfile] = useState<Profile[]>(initialProfile);

  const update = (id: string, value: string) => {
    setProfile((prev) => prev.map((p) => (p.id === id ? { ...p, value } : p)));
  };

  return (
    <div className="w-80">
      <List>
        <List.Header>Edit Profile</List.Header>
        {profile.map((p) => (
          <List.Item key={p.id} value={p.id}>
            <span className="text-sm text-foreground-400 w-28 shrink-0">{p.field}</span>
            <List.Input
              value={p.value}
              onChange={(e) => update(p.id, e.target.value)}
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
}

// ─── 8. Preferences (Select) ──────────────────────────────────────────────────

type Preference = {
  id: string;
  label: string;
  desc: string;
  selectedKey: string;
  options: { key: string; label: string }[];
};

const initialPreferences: Preference[] = [
  {
    id: "pr1",
    label: "Theme",
    desc: "App color scheme",
    selectedKey: "system",
    options: [{ key: "light", label: "Light" }, { key: "dark", label: "Dark" }, { key: "system", label: "System" }],
  },
  {
    id: "pr2",
    label: "Language",
    desc: "Display language",
    selectedKey: "en",
    options: [{ key: "en", label: "English" }, { key: "es", label: "Español" }, { key: "fr", label: "Français" }],
  },
  {
    id: "pr3",
    label: "Date format",
    desc: "How dates are shown",
    selectedKey: "mdy",
    options: [{ key: "mdy", label: "MM/DD/YYYY" }, { key: "dmy", label: "DD/MM/YYYY" }, { key: "iso", label: "ISO 8601" }],
  },
  {
    id: "pr4",
    label: "Density",
    desc: "UI spacing",
    selectedKey: "default",
    options: [{ key: "compact", label: "Compact" }, { key: "default", label: "Default" }, { key: "comfortable", label: "Comfortable" }],
  },
];

function PreferencesPreview() {
  const [prefs, setPrefs] = useState<Preference[]>(initialPreferences);

  const setKey = (id: string, key: string) => {
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, selectedKey: key } : p)));
  };

  return (
    <div className="w-80">
      <List>
        <List.Header>Preferences</List.Header>
        {prefs.map((p) => (
          <List.Item key={p.id} value={p.id}>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-foreground-100 truncate">{p.label}</span>
              <List.Desc>{p.desc}</List.Desc>
            </div>
            <List.Select selectedKey={p.selectedKey} onSelectionChange={(key: string) => setKey(p.id, key)}>
              <Select.Trigger>{p.options.find((o) => o.key === p.selectedKey)?.label ?? "Pick"}</Select.Trigger>
              <Select.Content>
                {p.options.map((o) => (
                  <Select.Item key={o.key} value={o.key}>{o.label}</Select.Item>
                ))}
              </Select.Content>
            </List.Select>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

// ─── Examples registry ────────────────────────────────────────────────────────

const examples: DevExample[] = [
  {
    id: "team-members",
    title: "Team Members",
    description: "Contact list with avatar initials, roles, and edit/remove action buttons. Click a row to select it.",
    preview: <TeamMembersPreview />,
    previewLayout: "center",
  },
  {
    id: "file-manager",
    title: "File Manager",
    description: "File browser with type icons, file metadata as secondary text, and download/more action buttons.",
    preview: <FileManagerPreview />,
    previewLayout: "center",
  },
  {
    id: "notification-feed",
    title: "Notification Feed",
    description: "Feed-style notification list with unread indicators. Click a notification to mark it as read.",
    preview: <NotificationFeedPreview />,
    previewLayout: "center",
  },
  {
    id: "task-checklist",
    title: "Task Checklist",
    description: "Todo list with checkboxes, priority badges, and strikethrough on completed tasks.",
    preview: <TaskChecklistPreview />,
    previewLayout: "center",
  },
  {
    id: "command-palette",
    title: "Command Palette",
    description: "Keyboard shortcut command list with icons and styled kbd shortcut hints.",
    preview: <CommandPalettePreview />,
    previewLayout: "center",
  },
  {
    id: "settings-panel",
    title: "Settings Panel",
    description: "System settings list with toggle switches. Each switch independently controls its setting.",
    preview: <SettingsPanelPreview />,
    previewLayout: "center",
  },
  {
    id: "inline-edit",
    title: "Inline Editing",
    description: "Editable profile fields with inline inputs aligned to the right of each row label.",
    preview: <InlineEditPreview />,
    previewLayout: "center",
  },
  {
    id: "preferences",
    title: "Preferences",
    description: "App preference rows with inline select dropdowns for choosing between enumerated options.",
    preview: <PreferencesPreview />,
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
