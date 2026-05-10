"use client";

import { useState } from "react";
import { Card, Button, Flex, Badge, Switch, Progress } from "ui-lab-components";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function NotificationCardPreview() {
  const [read, setRead] = useState(false);

  return (
    <Card style={{ width: 360, opacity: read ? 0.6 : 1, transition: "opacity 0.2s" }}>
      <Card.Header>
        <Flex justify="between" align="center">
          <span className="text-sm font-medium text-foreground-100">Deployment failed</span>
          <Badge variant="destructive">Error</Badge>
        </Flex>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-foreground-400">
          The production deploy of <span className="text-foreground-200">api-gateway</span> failed at step "Run tests". Check the logs for details.
        </p>
      </Card.Body>
      <Card.Footer>
        <Flex justify="between" align="center">
          <span className="text-xs text-foreground-500">2 minutes ago</span>
          <Button size="sm" variant="ghost" onPress={() => setRead(true)}>
            Mark as read
          </Button>
        </Flex>
      </Card.Footer>
    </Card>
  );
}

function SettingsPanelPreview() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Card style={{ width: 360 }}>
      <Card.Header>
        <span className="text-sm font-medium text-foreground-100">Notifications</span>
      </Card.Header>
      <Card.Body className="space-y-4 py-4">
        {[
          { label: "Email alerts", description: "Receive alerts via email" },
          { label: "Push notifications", description: "Browser push notifications" },
          { label: "Weekly digest", description: "Summary sent every Monday" },
        ].map((item) => (
          <Flex key={item.label} justify="between" align="center">
            <div>
              <p className="text-sm text-foreground-100">{item.label}</p>
              <p className="text-xs text-foreground-500">{item.description}</p>
            </div>
            <Switch
              isSelected={enabled}
              onChange={setEnabled}
              aria-label={item.label}
            />
          </Flex>
        ))}
      </Card.Body>
      <Card.Footer>
        <Flex justify="end" gap="xs">
          <Button size="sm" variant="ghost">Cancel</Button>
          <Button size="sm" variant="primary">Save</Button>
        </Flex>
      </Card.Footer>
    </Card>
  );
}

function TaskCardPreview() {
  const tasks = [
    { label: "Design review", done: true },
    { label: "Write changelog", done: true },
    { label: "Update docs", done: false },
    { label: "Deploy to staging", done: false },
  ];
  const completed = tasks.filter((t) => t.done).length;

  return (
    <Card style={{ width: 360 }}>
      <Card.Header>
        <Flex justify="between" align="center">
          <span className="text-sm font-medium text-foreground-100">Release v2.4.0</span>
          <span className="text-xs text-foreground-500">{completed}/{tasks.length}</span>
        </Flex>
        <Progress value={(completed / tasks.length) * 100} className="mt-2" />
      </Card.Header>
      <Card.Body className="py-3">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.label} className="flex items-center gap-2 text-sm">
              <span className={task.done ? "text-foreground-500 line-through" : "text-foreground-200"}>
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline" className="w-full">View milestone</Button>
      </Card.Footer>
    </Card>
  );
}

const examples: DevExample[] = [
  {
    id: "notification",
    title: "Notification Card",
    description: "A status-driven card with a badge, body copy, and a footer action. Caller controls read state.",
    preview: <NotificationCardPreview />,
  },
  {
    id: "settings-panel",
    title: "Settings Panel",
    description: "Card used as a settings section with a list of toggle rows and save/cancel actions in the footer.",
    preview: <SettingsPanelPreview />,
  },
  {
    id: "task-list",
    title: "Task Progress",
    description: "Card displaying a checklist with a progress bar in the header to summarize completion state.",
    preview: <TaskCardPreview />,
  },
];

export default function CardExamplesPage() {
  return (
    <DevExampleLayout
      title="Card Examples"
      description="Minimal card examples placed in distinct real-world contexts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
