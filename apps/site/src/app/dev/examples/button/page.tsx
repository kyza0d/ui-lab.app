"use client";

import { useState, useEffect } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Code } from "@/features/docs/components/code-display/code";
import { Button, Group, Divider, Select, Tooltip, Checkbox, Badge, useAnimatedWidth, toast, Toaster } from "ui-lab-components";

import { FaList, FaGrip, FaTable, FaBold, FaItalic, FaUnderline, FaChevronLeft, FaChevronRight, FaEllipsis, FaTrash, FaStrikethrough, FaListUl, FaLink, FaImage, FaQuoteLeft, FaRocket, FaCheck, FaXmark, FaSpinner, FaRotateRight, FaFolder, FaCopy, FaBoxArchive, FaFile, FaStop, FaTerminal, FaGear, FaBug, FaPlay, FaClock } from "react-icons/fa6";

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
    idle: { label: "Deploy to Production", icon: <FaRocket />, variant: "default", disabled: false },
    queued: { label: "Queued…", icon: <FaSpinner className="animate-spin" />, variant: "default", disabled: true },
    deploying: { label: "Deploying…", icon: <FaSpinner className="animate-spin" />, variant: "default", disabled: true },
    succeeded: { label: "Deployed", icon: <FaCheck />, variant: "default", disabled: false },
    failed: { label: "Failed — Retry", icon: <FaRotateRight />, variant: "default", disabled: false },
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
    <Group orientation="horizontal" spacing="sm">
      <Group.Button active={viewMode === "list"} onPress={() => setViewMode("list")}>
        <FaList className="mr-1.5" /> List
      </Group.Button>
      <Divider orientation="vertical" />
      <Group.Button active={viewMode === "grid"} onPress={() => setViewMode("grid")}>
        <FaGrip className="mr-1.5" /> Grid
      </Group.Button>
      <Divider orientation="vertical" />
      <Group.Button active={viewMode === "table"} onPress={() => setViewMode("table")}>
        <FaTable className="mr-1.5" /> Table
      </Group.Button>
    </Group>
  );
}

type RunMode = "run" | "schedule" | "debug" | "dry-run";
type RunState = "idle" | "running" | "success" | "failed";

const RUN_MODE_CONFIG: Record<RunMode, { label: string; icon: React.ReactNode; logs: string[] }> = {
  run: {
    label: "Run Pipeline",
    icon: <FaRocket size={12} />,
    logs: ["Initializing pipeline...", "Loading model checkpoint...", "Running AI inference...", "Processing output tokens...", "Finalizing results..."],
  },
  schedule: {
    label: "Schedule Run",
    icon: <FaClock size={12} />,
    logs: ["Registering schedule...", "Validating cron expression...", "Pipeline queued for next trigger..."],
  },
  debug: {
    label: "Debug Mode",
    icon: <FaBug size={12} />,
    logs: ["[DEBUG] Initializing context...", "[DEBUG] Loading embeddings...", "[DEBUG] Step 1/4: tokenizing input", "[DEBUG] Step 2/4: running inference", "[DEBUG] Step 3/4: postprocessing", "[DEBUG] Step 4/4: writing output"],
  },
  "dry-run": {
    label: "Dry Run",
    icon: <FaPlay size={12} />,
    logs: ["Validating pipeline config...", "Checking data sources...", "Simulating model call (no inference)...", "Dry run complete — no changes made"],
  },
};

function SplitActionPreview() {
  const [mode, setMode] = useState<string | number | null>("run");
  const [runState, setRunState] = useState<RunState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  const isRunning = runState === "running";
  const cfg = RUN_MODE_CONFIG[(mode as RunMode) ?? "run"] ?? RUN_MODE_CONFIG.run;

  useEffect(() => {
    if (runState !== "running") return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [runState]);

  useEffect(() => {
    if (runState !== "running") return;
    const isDry = mode === "dry-run";
    const timers: ReturnType<typeof setTimeout>[] = [];
    cfg.logs.forEach((msg, i) => {
      timers.push(setTimeout(() => setLogs(prev => [...prev, msg]), i * 650));
    });
    const duration = cfg.logs.length * 650 + 400;
    timers.push(setTimeout(() => {
      setRunState(isDry ? "success" : Math.random() > 0.2 ? "success" : "failed");
    }, duration));
    return () => timers.forEach(clearTimeout);
  }, [runState]);

  function handleRun() {
    setRunState("running");
    setElapsed(0);
    setLogs([]);
    setShowLogs(true);
  }

  function handleStop() {
    setRunState("idle");
    setLogs(prev => [...prev, "Pipeline stopped."]);
  }

  function handleModeChange(key: string | number | null) {
    setMode(key);
    setRunState("idle");
    setElapsed(0);
    setLogs([]);
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div className="flex items-center gap-2">
        <Group orientation="horizontal" spacing="none" className="shrink-0">
          <Group.Select selectedKey={mode} onSelectionChange={handleModeChange} isDisabled={isRunning}>
            <Group.Button
              onPress={handleRun}
              isDisabled={isRunning}
              icon={{ left: isRunning ? <FaSpinner className="animate-spin" size={12} /> : cfg.icon }}
              className="w-42 justify-start"
            >
              {isRunning ? "Running…" : cfg.label}
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
            <Group.Button className="p-2" onPress={handleStop} isDisabled={!isRunning}>
              <FaStop size={14} />
            </Group.Button>
          </Tooltip>
          <Tooltip content={showLogs ? "Hide logs" : "View logs"}>
            <Group.Button className="p-2" onPress={() => setShowLogs(s => !s)} active={showLogs}>
              <FaTerminal size={14} />
            </Group.Button>
          </Tooltip>
          <Tooltip content="Settings">
            {/* SUGGESTION: no onPress handler and no indication it's a placeholder — add handler or remove */}
            <Group.Button className="p-2" isDisabled={isRunning}>
              <FaGear size={14} />
            </Group.Button>
          </Tooltip>
        </Group>

        {runState === "success" && (
          <Badge variant="success" size="sm" pill icon={<FaCheck size={9} />}>{elapsed}s</Badge>
        )}
        {runState === "failed" && (
          <Badge variant="danger" size="sm" pill icon={<FaXmark size={9} />}>Failed</Badge>
        )}
      </div>

      {showLogs && (
        <Code language="bash" heading="Output">
          {logs.length === 0
            ? "# No output yet…"
            : isRunning
              ? [...logs, "▌"].join("\n")
              : logs.join("\n")}
        </Code>
      )}
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

        <Tooltip content="Bold">
          <Group.Button>
            <FaBold size={14} />
          </Group.Button>
        </Tooltip>

        <Divider orientation='vertical' />

        <Tooltip content="Italic">
          <Group.Button>
            <FaItalic size={14} />
          </Group.Button>
        </Tooltip>

        <Divider orientation='vertical' />

        <Tooltip content="More Options">
          <Group.Button>
            <FaEllipsis size={14} />
          </Group.Button>
        </Tooltip>


        <Tooltip content="Underline">
          <Group.Button>
            <FaUnderline size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip content="Strikethrough">
          <Group.Button>
            <FaStrikethrough size={14} />
          </Group.Button>
        </Tooltip>

        <Tooltip content="Bullet List">
          <Group.Button>
            <FaList size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip content="Numbered List">
          <Group.Button>
            <FaListUl size={14} />
          </Group.Button>
        </Tooltip>


        <Tooltip content="Insert Link">
          <Group.Button>
            <FaLink size={14} />
          </Group.Button>
        </Tooltip>
        <Tooltip content="Insert Image">
          <Group.Button>
            <FaImage size={14} />
          </Group.Button>
        </Tooltip>


        <Tooltip content="Block Quote">
          <Group.Button>
            <FaQuoteLeft size={14} />
          </Group.Button>
        </Tooltip>
      </Group>
      <Group orientation="horizontal" spacing="none">
        <Tooltip content="Bold">
          <Group.Button><FaBold size={14} /></Group.Button>
        </Tooltip>
        <Tooltip content="Italic">
          <Group.Button><FaItalic size={14} /></Group.Button>
        </Tooltip>
        <Tooltip content="Underline">
          <Group.Button><FaUnderline size={14} /></Group.Button>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip content="More options">
          <Group.Button><FaEllipsis size={14} /></Group.Button>
        </Tooltip>
      </Group>
    </div>
  );
}

function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 12;

  function getPages(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    let last = 0;
    for (let i = 1; i <= totalPages; i++) {
      const inWindow = i >= currentPage - 1 && i <= currentPage + 1;
      if (i === 1 || i === totalPages || inWindow) {
        if (last && i - last > 2) pages.push("...");
        else if (last && i - last === 2) pages.push(last + 1);
        pages.push(i);
        last = i;
      }
    }
    return pages;
  }

  return (
    <Group variant="ghost" spacing="sm">
      <Group.Button onPress={() => setCurrentPage(p => Math.max(1, p - 1))} isDisabled={currentPage === 1}>
        <FaChevronLeft size={12} />
      </Group.Button>
      {getPages().map((page, i) =>
        page === "..." ? (
          <Group.Button key={`ellipsis-${i}`} isDisabled className="cursor-default">
            <FaEllipsis className="mt-2" />
          </Group.Button>
        ) : (
          <Group.Button key={page} active={currentPage === page} onPress={() => setCurrentPage(page)}>
            {page}
          </Group.Button>
        )
      )}
      <Group.Button onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages}>
        <FaChevronRight size={12} />
      </Group.Button>
    </Group>
  );
}

const BULK_FILES = [
  { id: "1", name: "project-proposal.pdf" },
  { id: "2", name: "design-assets.zip" },
  { id: "3", name: "README.md" },
  { id: "4", name: "package.json" },
  { id: "5", name: "schema.sql" },
];

function BulkActionToolbar() {
  const [files, setFiles] = useState(BULK_FILES);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteStage, setDeleteStage] = useState<"idle" | "confirm">("idle");

  function toggleItem(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setDeleteStage("idle");
  }

  function toggleAll() {
    setSelected(prev =>
      prev.size === files.length ? new Set() : new Set(files.map(f => f.id))
    );
    setDeleteStage("idle");
  }

  function handleRowDelete(id: string) {
    setFiles(prev => prev.filter(f => f.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
    toast({ title: "1 file deleted", variant: "success" });
  }

  function handleBulkDelete() {
    const count = selected.size;
    setFiles(prev => prev.filter(f => !selected.has(f.id)));
    setSelected(new Set());
    setDeleteStage("idle");
    toast({ title: `${count} file${count !== 1 ? "s" : ""} deleted`, variant: "success" });
  }

  function handleMove() {
    const count = selected.size;
    toast({ title: `${count} file${count !== 1 ? "s" : ""} moved`, variant: "info" });
  }

  function handleArchive() {
    const count = selected.size;
    toast({ title: `${count} file${count !== 1 ? "s" : ""} archived`, variant: "info" });
  }

  const count = selected.size;
  const allSelected = count === files.length && files.length > 0;
  const someSelected = count > 0 && !allSelected;

  return (
    <>
      <div className={"border border-background-700 rounded-sm flex flex-col w-full max-w-md relative"}>
        <Toaster />
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-background-700">
          <Checkbox size="sm" isIndeterminate={someSelected} checked={allSelected} onChange={toggleAll} />
          <span className="text-xs text-foreground-400 select-none">Name</span>
        </div>

        {/* File rows */}
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-foreground-400">
            <FaFile size={24} className="text-foreground-300" />
            <span className="text-sm">No files</span>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              className={[
                "group flex h-14 items-center gap-3 px-3 py-2.5 border-b border-background-800 last:border-b-0 cursor-pointer transition-colors",
                selected.has(file.id) ? "bg-background-800/50" : "hover:bg-background-900"
              ].join(" ")}
              onClick={() => toggleItem(file.id)}
            >
              <Checkbox size="sm" checked={selected.has(file.id)} onChange={() => toggleItem(file.id)} />
              <FaFile size={12} className="text-foreground-400 shrink-0" />
              <span className="text-sm text-foreground-200 flex-1">{file.name}</span>
              {count === 0 && (
                <div
                  className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => e.stopPropagation()}
                >
                  <Tooltip content="Move">
                    <Button variant="ghost" className="p-2" icon={{ left: <FaFolder size={14} /> }} onPress={() => toast({ title: "File moved", variant: "info" })} />
                  </Tooltip>
                  <Tooltip content="Duplicate">
                    <Button variant="ghost" className="p-2" icon={{ left: <FaCopy size={14} /> }} onPress={() => { }} />
                  </Tooltip>
                  <Tooltip content="Archive">
                    <Button variant="ghost" className="p-2" icon={{ left: <FaBoxArchive size={14} /> }} onPress={() => toast({ title: "File archived", variant: "info" })} />
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button variant="ghost" className="p-2" icon={{ left: <FaTrash size={14} /> }} onPress={() => handleRowDelete(file.id)} />
                  </Tooltip>
                </div>
              )}
            </div>
          ))
        )}

        {/* Floating bottom toolbar */}
        {count > 0 && (
          <div className="h-14 absolute bottom-4 right-4 flex justify-center pointer-events-none">
            <Group className="w-80 px-2 pointer-events-auto flex justify-between items-center gap-2 py-1.5 rounded-sm border border-background-700 bg-background-900 shadow-sm" orientation="horizontal" spacing="sm">
              {deleteStage === "idle" && <span className="text-xs text-foreground-400">{count} selected</span>}
              {deleteStage === "idle" ? (
                <div>
                  <Tooltip content="Move">
                    <Group.Button onPress={handleMove}><FaFolder size={13} /></Group.Button>
                  </Tooltip>
                  <Tooltip content="Duplicate">
                    <Group.Button><FaCopy size={13} /></Group.Button>
                  </Tooltip>
                  <Tooltip content="Archive">
                    <Group.Button onPress={handleArchive}><FaBoxArchive size={13} /></Group.Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Group.Button onPress={() => setDeleteStage("confirm")}><FaTrash size={13} /></Group.Button>
                  </Tooltip>
                </div>
              ) : (
                <div className="flex w-full items-center gap-1.5">
                  <span className="text-xs mr-auto text-foreground-300">Delete {count}?</span>
                  <Button variant="danger" size="sm" icon={{ left: <FaCheck /> }} onPress={handleBulkDelete}>Yes</Button>
                  <Button variant="ghost" size="sm" icon={{ left: <FaXmark /> }} onPress={() => setDeleteStage("idle")}>Cancel</Button>
                </div>
              )}
            </Group>
          </div>
        )}
      </div>
    </>
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
    description: "Split button for triggering AI pipelines. Mode dropdown switches between Run, Schedule, Debug, and Dry Run. Icon toolbar provides Stop, Logs toggle, and Settings. Simulates async execution with streamed log output and a success/failed badge.",
    preview: <SplitActionPreview />,
  },
  {
    id: "action-buttons",
    title: "Bulk Action Toolbar",
    description: "File list with per-row actions and a floating toolbar that appears when items are selected. Two-stage inline confirmation prevents accidental deletes.",
    preview: <BulkActionToolbar />,
  },
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
