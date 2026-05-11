"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApp } from "@/features/theme";
import { generateThemeSetupFiles } from "@/features/theme/config";
import { Code } from "@/features/docs/components/code-display/code";
import { SettingsSidebar } from "@/features/theme/components/settings-sidebar";
import {
  Badge,
  Banner,
  Button,
  Card,
  CardBody,
  Checkbox,
  Date as Calendar,
  Divider,
  Expand,
  Flex,
  Grid,
  Input,
  Label,
  List,
  Menu,
  Modal,
  Page,
  Progress,
  Radio,
  Select,
  Slider,
  Switch,
  Table,
  Tabs,
  TextArea,
} from "ui-lab-components";
import {
  Download,
  Github,
  Megaphone,
  MoreHorizontal,
  PlugZap,
  Search,
  Send,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

const SETUP_INSTALL = `pnpm add ui-lab-components`;

function ExampleCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Card variant="secondary" className="border-background-700/80">
      <CardBody className="flex min-h-0 flex-1 flex-col gap-4 p-4">{children}</CardBody>
    </Card>
  );
}

function PreviewCanvas() {
  const { currentThemeColors } = useApp();

  if (!currentThemeColors) return null;

  const apiRows = [
    { endpoint: "POST /v1/messages", p95: "128 ms", status: "Healthy" },
    { endpoint: "GET /v1/projects", p95: "86 ms", status: "Healthy" },
    { endpoint: "POST /v1/exports", p95: "412 ms", status: "Spike" },
  ];

  const apiColumns = [
    { key: "endpoint" as const, label: "Endpoint" },
    { key: "p95" as const, label: "p95" },
    {
      key: "status" as const,
      label: "Status",
      render: (value: string) => <Badge variant={value === "Spike" ? "warning" : "success"}>{value}</Badge>,
    },
  ];

  const webhookRows = [
    { event: "checkout.created", destination: "Stripe", status: "Live" },
    { event: "lead.created", destination: "Loops", status: "Live" },
    { event: "user.deleted", destination: "Audit log", status: "Paused" },
  ];

  const webhookColumns = [
    { key: "event" as const, label: "Event" },
    { key: "destination" as const, label: "Destination" },
    {
      key: "status" as const,
      label: "Status",
      render: (value: string) => <Badge variant={value === "Paused" ? "warning" : "success"}>{value}</Badge>,
    },
  ];

  return (
    <Grid columns={{ sm: 1, md: 2, xl: 3 }} rows="masonry" alignItems="start" gap="md">
      <ExampleCard>
        <Flex direction="column" className="gap-3">
          <Input placeholder="you@example.com" icon={<Github size={14} />} />
          <Input placeholder="Password" type="password" />
          <Button className="justify-center">Get started</Button>
        </Flex>
      </ExampleCard>

      <ExampleCard>
        <Flex className="flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost" icon={<MoreHorizontal size={14} />} aria-label="More options" />
        </Flex>
      </ExampleCard>

      <ExampleCard>
        <Banner variant="success">
          <Banner.Title>Ready to ship</Banner.Title>
          <Banner.Body>All required steps are complete.</Banner.Body>
        </Banner>
      </ExampleCard>

      <ExampleCard>
        <Progress value={66} label="Launch checklist" showValue />
      </ExampleCard>

      <ExampleCard>
        <Flex direction="column" className="gap-3">
          <Checkbox defaultChecked label="Connect domain" />
          <Checkbox label="Invite team" />
          <Switch defaultSelected aria-label="Notifications" />
        </Flex>
      </ExampleCard>

      <ExampleCard>
        <Radio.Group defaultValue="annual" label="Billing">
          <Radio.Item value="monthly" label="Monthly" />
          <Radio.Item value="annual" label="Annual" />
        </Radio.Group>
      </ExampleCard>

      <ExampleCard>
        <Select defaultSelectedKey="pro" valueLabel="Pro">
          <Select.Trigger>
            <Select.Value placeholder="Plan" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="starter">Starter</Select.Item>
              <Select.Item value="pro">Pro</Select.Item>
              <Select.Item value="enterprise">Enterprise</Select.Item>
            </Select.List>
          </Select.Content>
        </Select>
      </ExampleCard>

      <ExampleCard>
        <Slider defaultValue={64} aria-label="Review threshold" />
      </ExampleCard>

      <ExampleCard>
        <Tabs default="rollout">
          <Tabs.List>
            <Tabs.Trigger value="rollout">Rollout</Tabs.Trigger>
            <Tabs.Trigger value="segments">Segments</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="rollout">
            <Progress value={42} label="Coverage" showValue />
          </Tabs.Content>
          <Tabs.Content value="segments">
            <List gap="xs">
              <List.Item value="free">
                <Flex align="center" justify="between" className="w-full gap-3">
                  <List.Title>Free tier</List.Title>
                  <Switch aria-label="Free tier" />
                </Flex>
              </List.Item>
            </List>
          </Tabs.Content>
        </Tabs>
      </ExampleCard>

      <ExampleCard>
        <Table data={apiRows} columns={apiColumns} />
      </ExampleCard>

      <ExampleCard>
        <Input placeholder="Search feedback" icon={<Search size={14} />} />
      </ExampleCard>

      <ExampleCard>
        <List gap="xs">
          <List.Item value="slack">
            <List.Media>
              <Megaphone size={16} />
            </List.Media>
            <div className="min-w-0">
              <List.Title>Integrations</List.Title>
              <List.Desc>Most requested</List.Desc>
            </div>
            <Badge variant="success">Ship</Badge>
          </List.Item>
          <List.Item value="sso">
            <List.Media>
              <ShieldCheck size={16} />
            </List.Media>
            <div className="min-w-0">
              <List.Title>Enterprise auth</List.Title>
              <List.Desc>Blocking deals</List.Desc>
            </div>
            <Badge variant="warning">Later</Badge>
          </List.Item>
        </List>
      </ExampleCard>

      <ExampleCard>
        <TextArea
          placeholder="What's new in this release?"
          maxCharacters={120}
          maxHeight="5rem"
        />
      </ExampleCard>

      <ExampleCard>
        <Flex direction="column" className="gap-3">
          <Input value="sarah@startup.dev" readOnly icon={<UserPlus size={14} />} />
          <Button icon={<Send size={14} />} className="justify-center">
            Send invite
          </Button>
        </Flex>
      </ExampleCard>

      <ExampleCard>
        <Menu type="pop-over">
          <Menu.Trigger>
            <Button variant="outline" icon={<MoreHorizontal size={14} />}>
              Actions
            </Button>
          </Menu.Trigger>
          <Menu.Content side="bottom">
            <Menu.Item>Edit role</Menu.Item>
            <Menu.Item>Remove</Menu.Item>
          </Menu.Content>
        </Menu>
      </ExampleCard>

      <ExampleCard>
        <Expand title="Advanced settings" defaultExpanded>
          <Flex direction="column" className="gap-3 p-3">
            <Checkbox defaultChecked label="Notify voters" />
            <Checkbox label="Create Linear task" />
          </Flex>
        </Expand>
      </ExampleCard>

      <ExampleCard>
        <Flex className="flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge icon={<PlugZap size={12} />}>Live</Badge>
        </Flex>
      </ExampleCard>

      <ExampleCard>
        <Calendar value={new globalThis.Date(2026, 4, 19)} defaultMonth={new globalThis.Date(2026, 4, 1)} />
      </ExampleCard>

      <ExampleCard>
        <Table data={webhookRows} columns={webhookColumns} />
      </ExampleCard>

      <ExampleCard>
        <Flex direction="column" className="gap-2">
          <Button variant="ghost" className="justify-start">Before divider</Button>
          <Divider />
          <Button variant="ghost" className="justify-start">After divider</Button>
        </Flex>
      </ExampleCard>
    </Grid>
  );
}

function ExportContent({
  themeCss,
  globalsCss,
  layoutTsx,
  themeToggleTsx,
  themeToggleModuleCss,
  bundleSizeLabel,
  onDownload,
}: {
  themeCss: string;
  globalsCss: string;
  layoutTsx: string;
  themeToggleTsx: string;
  themeToggleModuleCss: string;
  bundleSizeLabel: string;
  onDownload: () => void;
}) {
  return (
    <Flex direction="column" className="gap-4">
      <Flex align="start" justify="between" className="gap-3">
        <Flex direction="column" className="gap-2">
          <Label size="sm" styles="font-semibold text-foreground-300">
            Export bundle
          </Label>
          <span className="text-sm text-foreground-400">5 files · {bundleSizeLabel}</span>
        </Flex>

        <Button
          onPress={onDownload}
          variant="secondary"
          className="shrink-0"
          icon={<Download size={12} />}
        >
          Download
        </Button>
      </Flex>

      <Tabs default="theme">
        <Tabs.List>
          <Tabs.Trigger value="theme">theme.css</Tabs.Trigger>
          <Tabs.Trigger value="globals">globals.css</Tabs.Trigger>
          <Tabs.Trigger value="layout">layout.tsx</Tabs.Trigger>
          <Tabs.Trigger value="toggle">theme-toggle.tsx</Tabs.Trigger>
          <Tabs.Trigger value="toggle-css">theme-toggle.module.css</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="theme">
          <Code language="css" filename="theme.css">
            {themeCss}
          </Code>
        </Tabs.Content>
        <Tabs.Content value="globals">
          <Code language="css" filename="globals.css">
            {globalsCss}
          </Code>
        </Tabs.Content>
        <Tabs.Content value="layout">
          <Code language="tsx" filename="app/layout.tsx">
            {layoutTsx}
          </Code>
        </Tabs.Content>
        <Tabs.Content value="toggle">
          <Code language="tsx" filename="components/theme-toggle/index.tsx">
            {themeToggleTsx}
          </Code>
        </Tabs.Content>
        <Tabs.Content value="toggle-css">
          <Code language="css" filename="components/theme-toggle/theme-toggle.module.css">
            {themeToggleModuleCss}
          </Code>
        </Tabs.Content>
      </Tabs>

      <Expand title="Setup" defaultExpanded={false}>
        <div className="space-y-4 p-4">
          <div className="space-y-1">
            <Label>1. Install the package</Label>
            <Code language="bash" filename="terminal">
              {SETUP_INSTALL}
            </Code>
          </div>

          <div className="space-y-1">
            <Label>2. Copy `theme.css`</Label>
            <div className="text-sm text-foreground-400">
              Paste the generated token layer into `app/theme.css`.
            </div>
          </div>

          <div className="space-y-1">
            <Label>3. Merge `globals.css` and `layout.tsx`</Label>
            <div className="text-sm text-foreground-400">
              Keep the font imports, theme variables, and server-stamped color mode script.
            </div>
          </div>

          <div className="space-y-1">
            <Label>4. Copy the theme toggle files</Label>
            <div className="text-sm text-foreground-400">
              Render the generated toggle anywhere in your client tree.
            </div>
          </div>
        </div>
      </Expand>
    </Flex>
  );
}

export default function ConfigPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const {
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyFontWeightScale,
    headerLineHeight,
    bodyLineHeight,
    radius,
    borderWidth,
    spacingScale,
    selectedBodyFont,
    selectedHeaderFont,
    selectedMonoFont,
  } = useApp();

  useEffect(() => {
    document.body.dataset.configFullBleed = "true";

    return () => {
      delete document.body.dataset.configFullBleed;
    };
  }, []);

  const themeSetup = useMemo(() => {
    if (!currentThemeColors) return null;

    return generateThemeSetupFiles(
      currentThemeColors,
      currentThemeMode,
      headerTypeSizeRatio,
      headerFontSizeScale,
      headerFontWeightScale,
      headerFontWeightScale,
      bodyFontWeightScale,
      headerLineHeight,
      bodyLineHeight,
      radius,
      borderWidth,
      spacingScale,
      undefined,
      {
        bodyFont: selectedBodyFont,
        headerFont: selectedHeaderFont,
        monoFont: selectedMonoFont,
      },
    );
  }, [
    currentThemeColors,
    currentThemeMode,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyFontWeightScale,
    headerLineHeight,
    bodyLineHeight,
    radius,
    borderWidth,
    spacingScale,
    selectedBodyFont,
    selectedHeaderFont,
    selectedMonoFont,
  ]);

  const bundleSizeLabel = useMemo(() => {
    if (!themeSetup) return "0 KB";
    const kb = Math.max(1, Math.round(themeSetup.fullBundle.length / 1024));
    return `~${kb} KB`;
  }, [themeSetup]);

  const handleDownload = useCallback(() => {
    if (!themeSetup) return;
    const blob = new Blob([themeSetup.fullBundle], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-lab-theme-setup.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [themeSetup]);

  if (!currentThemeColors) {
    return (
      <div role="status" className="flex items-center justify-center min-h-[400px]">
        <p className="text-foreground-400">Loading configuration...</p>
      </div>
    );
  }

  return (
    <Page
      padding="none"
      maxWidth="none"
      centered={false}
      fullscreen
      styles="bg-background-950 text-foreground-100 space-y-6"
    >
      <div className="grid w-full pt-4 xl:grid-cols-[27rem_minmax(0,1fr)]">
        <SettingsSidebar
          footer={
            <Button
              onPress={() => setIsExportOpen(true)}
              variant="secondary"
              className="w-full justify-center"
              icon={<Download size={12} />}
            >
              Export theme
            </Button>
          }
        />

        <section className="px-6 min-w-0 space-y-6 xl:pt-0">
          <PreviewCanvas />
        </section>
      </div>
      <Modal
        isOpen={isExportOpen}
        onOpenChange={setIsExportOpen}
        title="Export theme"
        className="max-w-[min(92vw,72rem)]"
        contentClassName="p-6"
      >
        <ExportContent
          themeCss={themeSetup?.themeCss ?? ""}
          globalsCss={themeSetup?.globalsCss ?? ""}
          layoutTsx={themeSetup?.layoutTsx ?? ""}
          themeToggleTsx={themeSetup?.themeToggleTsx ?? ""}
          themeToggleModuleCss={themeSetup?.themeToggleModuleCss ?? ""}
          bundleSizeLabel={bundleSizeLabel}
          onDownload={handleDownload}
        />
      </Modal>
    </Page>
  );
}
