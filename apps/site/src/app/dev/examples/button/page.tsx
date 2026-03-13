"use client";

import { useEffect, useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Button, Group, Divider, Select, Tooltip, useAnimatedWidth } from "ui-lab-components";

import { FaList, FaGrip, FaTable, FaBold, FaItalic, FaUnderline, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaAnglesLeft, FaAnglesRight, FaEllipsis, FaStrikethrough, FaListUl, FaLink, FaImage, FaQuoteLeft, FaRocket, FaCheck, FaRotateRight, FaSpinner, FaStop, FaTerminal, FaGear, FaBug, FaPlay, FaClock } from "react-icons/fa6";

type DeployStage = "idle" | "queued" | "deploying" | "succeeded" | "failed";

function DeployPipelineButton() {
  const [stage, setStage] = useState<DeployStage>("idle");
  const wrapperRef = useAnimatedWidth({ duration: 200, easing: "cubic-bezier(0.25, 0, 0.25, 1)", trigger: stage });

  useEffect(() => {
    if (stage === "queued") {
      const t = setTimeout(() => setStage("deploying"), 1200);
      return () => clearTimeout(t);
    }
    if (stage === "deploying") {
      const t = setTimeout(() => {
        setStage(Math.random() > 0.25 ? "succeeded" : "failed");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const stageConfig: Record<DeployStage, { label: string; icon: React.ReactNode; variant: "primary" | "default" | "outline" | "ghost" | "danger"; disabled: boolean }> = {
    idle: { label: "Deploy to Production", icon: <FaRocket />, variant: "outline", disabled: false },
    queued: { label: "Queued…", icon: <FaSpinner className="animate-spin" />, variant: "outline", disabled: true },
    deploying: { label: "Deploying…", icon: <FaSpinner className="animate-spin" />, variant: "outline", disabled: true },
    succeeded: { label: "Deployed", icon: <FaCheck />, variant: "outline", disabled: false },
    failed: { label: "Failed — Retry", icon: <FaRotateRight />, variant: "danger", disabled: false },
  };

  const cfg = stageConfig[stage];

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={wrapperRef}
      >
        <Button
          variant={cfg.variant}
          icon={{ left: cfg.icon }}
          isDisabled={cfg.disabled}
          onPress={() => {
            if (stage === "idle" || stage === "succeeded" || stage === "failed") {
              setStage("queued");
            }
          }}
        >
          {cfg.label}
        </Button>
      </div>
    </div>
  );
}

function JoinedTogglePreview() {
  const [viewMode, setViewMode] = useState("list");
  return (
    <Group orientation="horizontal" spacing="xs">
      <Group.Button active={viewMode === "list"} onPress={() => setViewMode("list")}>
        <FaList className="mr-1.5 text-foreground-400" /> List
      </Group.Button>
      <Divider orientation="vertical" />
      <Group.Button active={viewMode === "grid"} onPress={() => setViewMode("grid")}>
        <FaGrip className="mr-1.5 text-foreground-400" /> Grid
      </Group.Button>
      <Divider orientation="vertical" />
      <Group.Button active={viewMode === "table"} onPress={() => setViewMode("table")}>
        <FaTable className="mr-1.5 text-foreground-400" /> Table
      </Group.Button>
    </Group>
  );
}

type RunMode = "run" | "schedule" | "debug" | "dry-run";

const RUN_MODE_CONFIG: Record<RunMode, { label: string; icon: React.ReactNode }> = {
  run: { label: "Run Pipeline", icon: <FaRocket size={12} /> },
  schedule: { label: "Schedule Run", icon: <FaClock size={12} /> },
  debug: { label: "Debug Mode", icon: <FaBug size={12} /> },
  "dry-run": { label: "Dry Run", icon: <FaPlay size={12} /> },
};

function SplitActionPreview() {
  const [mode, setMode] = useState<string | number | null>("run");
  const cfg = RUN_MODE_CONFIG[(mode as RunMode) ?? "run"] ?? RUN_MODE_CONFIG.run;

  return (
    <div className="flex items-center gap-2">
      <Group orientation="horizontal" spacing="none" className="shrink-0">
        <Group.Select selectedKey={mode} onSelectionChange={setMode}>
          <Group.Button icon={{ left: cfg.icon }} className="w-40 justify-start">
            {cfg.label}
          </Group.Button>
          <Divider />
          <Select.Trigger />
          <Select.Content>
            <Select.List>
              <Select.Item value="run" textValue="Run Pipeline">Run Pipeline</Select.Item>
              <Select.Item value="schedule" textValue="Schedule Run">Schedule Run</Select.Item>
              <Select.Item value="debug" textValue="Debug Mode">Debug Mode</Select.Item>
              <Select.Item value="dry-run" textValue="Dry Run">Dry Run</Select.Item>
            </Select.List>
          </Select.Content>
        </Group.Select>
      </Group>

      <Divider orientation="vertical" />

      <Group variant="ghost" spacing="sm">
        <Tooltip content="Stop">
          <Group.Button className="p-2">
            <FaStop size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip content="View logs">
          <Group.Button className="p-2">
            <FaTerminal size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip content="Settings">
          <Group.Button className="p-2">
            <FaGear size={14} />
          </Group.Button>
        </Tooltip>
      </Group>
    </div>
  );
}

function ToolbarPreview() {
  const [textStyle, setTextStyle] = useState<string | number | null>('normal')
  return (
    <div className="flex flex-col gap-8">
      <Group orientation="horizontal" spacing="sm">
        <Group.Select className='w-34' selectedKey={textStyle} onSelectionChange={setTextStyle}>
          <Select.Trigger>
            <Select.Value placeholder="Text Style" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="normal" textValue="Normal">Normal</Select.Item>
              <Select.Item value="h1" textValue="Heading 1">Heading 1</Select.Item>
              <Select.Item value="h2" textValue="Heading 2">Heading 2</Select.Item>
              <Select.Item value="quote" textValue="Quote">Quote</Select.Item>
              <Select.Item value="code" textValue="Code">Code</Select.Item>
            </Select.List>
          </Select.Content>
        </Group.Select>

        <Tooltip showArrow content="Bold">
          <Group.Button>
            <FaBold size={14} />
          </Group.Button>
        </Tooltip>

        <Divider orientation='vertical' />

        <Tooltip showArrow content="Italic">
          <Group.Button>
            <FaItalic size={14} />
          </Group.Button>
        </Tooltip>

        <Divider orientation='vertical' />

        <Tooltip showArrow content="More Options">
          <Group.Button>
            <FaEllipsis size={14} />
          </Group.Button>
        </Tooltip>


        <Tooltip showArrow content="Underline">
          <Group.Button>
            <FaUnderline size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip showArrow content="Strikethrough">
          <Group.Button>
            <FaStrikethrough size={14} />
          </Group.Button>
        </Tooltip>

        <Tooltip showArrow content="Bullet List">
          <Group.Button>
            <FaList size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip showArrow content="Numbered List">
          <Group.Button>
            <FaListUl size={14} />
          </Group.Button>
        </Tooltip>


        <Tooltip showArrow content="Insert Link">
          <Group.Button>
            <FaLink size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip showArrow content="Insert Image">
          <Group.Button>
            <FaImage size={14} />
          </Group.Button>
        </Tooltip>


        <Tooltip showArrow content="Block Quote">
          <Group.Button>
            <FaQuoteLeft size={14} />
          </Group.Button>
        </Tooltip>
      </Group>
      <Group orientation="horizontal" spacing="none">
        <Tooltip showArrow content="Bold">
          <Group.Button><FaBold size={14} /></Group.Button>
        </Tooltip>
        <Tooltip showArrow content="Italic">
          <Group.Button><FaItalic size={14} /></Group.Button>
        </Tooltip>
        <Tooltip showArrow content="Underline">
          <Group.Button><FaUnderline size={14} /></Group.Button>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip showArrow content="More options">
          <Group.Button><FaEllipsis size={14} /></Group.Button>
        </Tooltip>
      </Group>
    </div>
  );
}

function PaginationPreview() {
  const [rowsPerPage, setRowsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  function pageStepper() {
    return (
      <div className="flex items-center gap-1 px-2.5 text-sm tabular-nums select-none">
        <span>{currentPage}/{totalPages}</span>
        <div className="flex flex-col text-foreground-400">
          <button
            className="hover:text-foreground disabled:opacity-30 leading-none"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <FaChevronUp size={7} />
          </button>
          <button
            className="hover:text-foreground disabled:opacity-30 leading-none"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <FaChevronDown size={7} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Compact */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground-400 select-none">Rows per page</span>
        <Group spacing="none">
          <Group.Input
            type="number"
            min={1}
            value={rowsPerPage}
            onChange={e => setRowsPerPage(Number(e.target.value))}
            className="w-14 text-center"
          />
          <Divider orientation="vertical" />
          <Tooltip content="First page">
            <Group.Button isDisabled={currentPage === 1} onPress={() => setCurrentPage(1)} className="px-2.5">
              <FaAnglesLeft size={11} />
            </Group.Button>
          </Tooltip>
          <Tooltip content="Previous page">
            <Group.Button isDisabled={currentPage === 1} onPress={() => setCurrentPage(p => p - 1)} className="px-2.5">
              <FaChevronLeft size={11} />
            </Group.Button>
          </Tooltip>
          {pageStepper()}
          <Tooltip content="Next page">
            <Group.Button isDisabled={currentPage === totalPages} onPress={() => setCurrentPage(p => p + 1)} className="px-2.5">
              <FaChevronRight size={11} />
            </Group.Button>
          </Tooltip>
          <Tooltip content="Last page">
            <Group.Button isDisabled={currentPage === totalPages} onPress={() => setCurrentPage(totalPages)} className="px-2.5">
              <FaAnglesRight size={11} />
            </Group.Button>
          </Tooltip>
        </Group>
      </div>

      {/* Expanded */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground-400 select-none">Rows per page</span>
        <Group spacing="none">
          <Group.Input
            type="number"
            min={1}
            value={rowsPerPage}
            onChange={e => setRowsPerPage(Number(e.target.value))}
            className="w-14 text-center"
          />
        </Group>
        <span className="text-sm text-foreground-400 select-none">Page</span>
        <Group spacing="none">
          {pageStepper()}
        </Group>
        <Group spacing="none">
          <Tooltip content="First page">
            <Group.Button isDisabled={currentPage === 1} onPress={() => setCurrentPage(1)} className="px-2.5">
              <FaAnglesLeft size={11} />
            </Group.Button>
          </Tooltip>
          <Tooltip content="Previous page">
            <Group.Button isDisabled={currentPage === 1} onPress={() => setCurrentPage(p => p - 1)} className="px-2.5">
              <FaChevronLeft size={11} />
            </Group.Button>
          </Tooltip>
          <Tooltip content="Next page">
            <Group.Button isDisabled={currentPage === totalPages} onPress={() => setCurrentPage(p => p + 1)} className="px-2.5">
              <FaChevronRight size={11} />
            </Group.Button>
          </Tooltip>
          <Tooltip content="Last page">
            <Group.Button isDisabled={currentPage === totalPages} onPress={() => setCurrentPage(totalPages)} className="px-2.5">
              <FaAnglesRight size={11} />
            </Group.Button>
          </Tooltip>
        </Group>
      </div>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "joined-toggle",
    title: "Joined Toggle Buttons",
    description: "Multiple buttons grouped together for view/mode selection with active state indication.",
    preview: <JoinedTogglePreview />,
  },
  {
    id: "pagination",
    title: "Pagination Controls",
    description: "Ghost variant Group with active state for page navigation.",
    preview: <PaginationPreview />,
  },
  {
    id: "toolbar",
    title: "Editor Toolbar",
    description: "Icon buttons grouped together with a divider to separate related actions.",
    preview: <ToolbarPreview />,
  },
  {
    id: "variants",
    title: "Deploy Pipeline Button",
    description: "Stateful button cycling through idle → queued → deploying → succeeded/failed. Variant and icon communicate state; no extra UI needed.",
    preview: <DeployPipelineButton />,
    previewLayout: "start" as const,
  },
  {
    id: "split-action",
    title: "AI Workflow Runner",
    description: "Split button with a mode dropdown and a ghost icon toolbar for secondary actions.",
    preview: <SplitActionPreview />,
  }
];

export default function ButtonExamplesPage() {
  return (
    <DevExampleLayout
      title="Button Examples"
      description="Development environment for Button component examples. These render exactly as they would on the production component page."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
