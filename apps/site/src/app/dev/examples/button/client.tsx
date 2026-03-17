"use client";


import { useEffect, useReducer, useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Button, Group, Divider, Select, Tooltip, useAnimatedWidth } from "ui-lab-components";

import { FaList, FaGrip, FaTable, FaBold, FaItalic, FaUnderline, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaAnglesLeft, FaAnglesRight, FaEllipsis, FaStrikethrough, FaListUl, FaLink, FaImage, FaQuoteLeft, FaRocket, FaCheck, FaRotateRight, FaSpinner, FaStop, FaTerminal, FaGear, FaBug, FaPlay, FaClock } from "react-icons/fa6";

type DeployStage = "idle" | "queued" | "deploying" | "succeeded" | "failed";

type DeployAction = { type: "START" } | { type: "NEXT" } | { type: "COMPLETE"; success: boolean };

function deployReducer(state: DeployStage, action: DeployAction): DeployStage {
  switch (action.type) {
    case "START":
      return (state === "idle" || state === "succeeded" || state === "failed") ? "queued" : state;
    case "NEXT":
      return state === "queued" ? "deploying" : state;
    case "COMPLETE":
      return state === "deploying" ? (action.success ? "succeeded" : "failed") : state;
    default:
      return state;
  }
}

function DeployPipelineButton() {
  const [stage, dispatch] = useReducer(deployReducer, "idle");
  const wrapperRef = useAnimatedWidth({ duration: 200, easing: "cubic-bezier(0.25, 0, 0.25, 1)", trigger: stage });

  useEffect(() => {
    if (stage === "queued") {
      const t = setTimeout(() => dispatch({ type: "NEXT" }), 1200);
      return () => clearTimeout(t);
    }
    if (stage === "deploying") {
      const t = setTimeout(() => {
        dispatch({ type: "COMPLETE", success: Math.random() > 0.25 });
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
          onPress={() => dispatch({ type: "START" })}
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

const examples: DevExample[] = [
  {
    id: "joined-toggle",
    title: "Joined Toggle Buttons",
    description: "Multiple buttons grouped together for view/mode selection with active state indication.",
    preview: <JoinedTogglePreview />,
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
