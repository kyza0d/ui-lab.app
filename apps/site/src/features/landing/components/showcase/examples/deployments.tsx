"use client";

import { useState, useEffect } from "react";
import { Badge, Button, Divider, Group, Scroll, Select, Tooltip } from "ui-lab-components";
import { FaRotateRight, FaCodeBranch, FaTerminal, FaCheck, FaXmark } from "react-icons/fa6";
import { Sparkles, ArrowRightLeft, GitMerge, Settings2, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";

type DeployStatus = "building" | "deployed" | "failed";
interface Author { name: string; initials: string }
interface Deployment {
  id: string; branch: string; commit: string; message: string;
  author: Author; status: DeployStatus; duration: string | null;
  time: string; startedAt?: number; aiReviewed?: boolean;
}

const AUTHORS: Author[] = [
  { name: "Alex K", initials: "AK" },
  { name: "Maria S", initials: "MS" },
  { name: "Jordan L", initials: "JL" },
  { name: "Sam T", initials: "ST" },
];

const INITIAL: Deployment[] = [
  { id: "1", branch: "main", commit: "a3f9d2c", message: "feat: redesign dashboard layout", author: AUTHORS[0], status: "deployed", duration: "1m 42s", time: "4m ago", aiReviewed: true },
  { id: "2", branch: "feat/redesign", commit: "b1e7f4a", message: "chore: update dependencies", author: AUTHORS[1], status: "deployed", duration: "2m 18s", time: "1h ago" },
  { id: "3", branch: "main", commit: "c8d2e1b", message: "fix: auth token refresh loop", author: AUTHORS[2], status: "failed", duration: "0m 54s", time: "3h ago", aiReviewed: true },
  { id: "4", branch: "fix/auth", commit: "d4c9f3e", message: "refactor: extract user service", author: AUTHORS[3], status: "deployed", duration: "3m 05s", time: "6h ago" },
];

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4 flex-shrink-0 text-foreground-400" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
        strokeDasharray="60" strokeDashoffset="20" strokeLinecap="round" />
    </svg>
  );
}

function StatusIcon({ status }: { status: DeployStatus }) {
  if (status === "building") return <Spinner />;
  if (status === "deployed") return <FaCheck className="w-4 h-4 shrink-0 text-foreground-300" />;
  return <FaXmark className="w-4 h-4 flex-shrink-0 text-foreground-500" />;
}

function ElapsedTimer({ startedAt }: { startedAt: number }) {
  const [elapsed, setElapsed] = useState(() => Date.now() - startedAt);
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startedAt), 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  const s = Math.floor(elapsed / 1000);
  return <span>{Math.floor(s / 60)}m {String(s % 60).padStart(2, "0")}s</span>;
}

function AuthorAvatar({ author }: { author: Author }) {
  return (
    <span className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-semibold flex-shrink-0 text-foreground-300 bg-background-800">
      {author.initials}
    </span>
  );
}

export function BuildStatus() {
  const [deployments, setDeployments] = useState<Deployment[]>(INITIAL);
  const [isDeploying, setIsDeploying] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  function triggerDeploy() {
    if (isDeploying) return;
    setIsDeploying(true);
    const id = Date.now().toString();
    const commit = Math.random().toString(36).slice(2, 9);
    const startedAt = Date.now();
    setDeployments((prev) => [
      { id, branch: "main", commit, message: "feat: add new component library", author: AUTHORS[0], status: "building", duration: null, time: "just now", startedAt },
      ...prev,
    ]);
    setTimeout(() => {
      const totalS = Math.floor((Date.now() - startedAt) / 1000);
      const duration = `${Math.floor(totalS / 60)}m ${String(totalS % 60).padStart(2, "0")}s`;
      setDeployments((prev) => prev.map((d) => d.id === id ? { ...d, status: "deployed", duration, aiReviewed: true } : d));
      setIsDeploying(false);
    }, 3000);
  }

  function handleAction(key: string | number | null) {
    const labels: Record<string, string> = {
      "ai-review": "Launching AI code review...",
      "ai-deps": "Scanning dependency graph...",
      "ai-perf": "Analyzing bundle performance...",
      "ai-security": "Running security audit...",
      "rollback-prev": "Rolling back to previous deploy...",
      "rollback-commit": "Select a commit to restore...",
      "promote": "Preparing to promote build...",
      "settings": "Opening environment settings...",
    };
    if (!key) return;
    setActionFeedback(labels[key as string] ?? "Running action...");
    setTimeout(() => setActionFeedback(null), 2500);
  }

  const latest = deployments[0];

  return (
    <div className="shadow-sm w-full bg-background-200 border border-background-700 rounded-md overflow-hidden">

      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-foreground-400 hover:text-foreground-200 transition-colors cursor-pointer">ui-lab.app</span>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip content="30-day uptime" position="bottom">
              <span className="text-xs text-foreground-500 cursor-default">
                <span className="text-foreground-200 font-semibold">99.8%</span> up
              </span>
            </Tooltip>
            <Tooltip content="Deployments today" position="bottom">
              <span className="text-xs text-foreground-500 cursor-default">
                <span className="text-foreground-200 font-semibold">{deployments.length}</span> deploys
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <FaCodeBranch className="w-3.5 h-3.5 text-foreground-500 flex-shrink-0" />
          <code className="text-xs font-mono text-foreground-300 flex-shrink-0">{latest.branch}</code>
          <Badge size="sm">{latest.commit}</Badge>
          <span className="text-xs text-foreground-300 truncate">{latest.message}</span>
        </div>
      </div>

      <Divider size="sm" spacing="none" />

      <div className="p-2 gap-3 flex items-center justify-between">
        <Group orientation="horizontal">
          <Tooltip content="Redeploy" position="bottom">
            <Group.Button
              onPress={triggerDeploy}
              isDisabled={isDeploying}
              variant="ghost"
              aria-label="Redeploy"
              className="px-3"
            >
              <FaRotateRight className={`w-4 h-4 ${isDeploying ? "animate-spin" : ""}`} />
            </Group.Button>
          </Tooltip>
          <Divider />
          <Tooltip content="View Logs" position="bottom">
            <Group.Button variant="ghost" aria-label="View Logs" className="px-3">
              <FaTerminal className="w-4 h-4" />
            </Group.Button>
          </Tooltip>
        </Group>
        <Button size="sm" variant="outline" icon={{ left: <SiGithub /> }}>
          Repository
        </Button>

        <Select selectedKey={null} onSelectionChange={handleAction} className="w-fit ml-auto">
          <Select.Trigger variant="ghost">
            <Select.Value placeholder="Actions" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Sub>
                <Select.SubTrigger textValue="AI Review">
                  <Sparkles className="w-4 h-4 text-foreground-400" />
                  AI Review
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="ai-review" textValue="Review Changes">Review Changes</Select.Item>
                  <Select.Item value="ai-deps" textValue="Check Dependencies">Check Dependencies</Select.Item>
                  <Select.Item value="ai-perf" textValue="Analyze Performance">Analyze Performance</Select.Item>
                  <Select.Item value="ai-security" textValue="Security Scan">Security Scan</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Sub>
                <Select.SubTrigger textValue="Rollback">
                  <ArrowRightLeft className="w-4 h-4 text-foreground-400" />
                  Rollback
                </Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value="rollback-prev" textValue="Previous Deploy">Previous Deploy</Select.Item>
                  <Select.Item value="rollback-commit" textValue="Specific Commit">Specific Commit</Select.Item>
                </Select.SubContent>
              </Select.Sub>
              <Select.Item value="promote" textValue="Promote Build" icon={<GitMerge className="w-4 h-4" />}>
                Promote Build
              </Select.Item>
              <Select.Item value="settings" textValue="Settings" icon={<Settings2 className="w-4 h-4" />}>
                Settings
              </Select.Item>
            </Select.List>
          </Select.Content>
        </Select>
      </div>

      {actionFeedback && (
        <>
          <Divider size="sm" spacing="none" />
          <div className="px-5 py-2 flex items-center gap-2 bg-background-300 border-l-2 border-background-600">
            <span className="text-xs text-foreground-400">{actionFeedback}</span>
          </div>
        </>
      )}

      <Divider size="sm" spacing="none" />

      <div className="px-5 pt-3 pb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground-400">Deployments</span>
        <span className="text-xs text-foreground-400">{deployments.length} recent</span>
      </div>

      <Scroll fadeY maxHeight="220px" style={{ height: "220px" }}>
        {deployments.map((d, i) => (
          <div key={d.id} className={`relative${d.status === "building" ? " bg-background-300" : ""}`}>
            {d.status === "building" && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-foreground-500" />
            )}
            <div className="flex items-center gap-2.5 px-5 py-2.5">
              <StatusIcon status={d.status} />
              <span className={`text-xs flex-1 min-w-0 truncate ${d.status === "failed" ? "text-foreground-500 line-through" : "text-foreground-100"}`}>
                {d.message}
              </span>
              <Tooltip content={`${d.author.name} · ${d.branch}`} position="top">
                <AuthorAvatar author={d.author} />
              </Tooltip>
              <Tooltip content={`${d.branch}@${d.commit}`} position="top">
                <code className="text-xs font-mono text-foreground-500 bg-background-400 px-1 py-0.5 rounded leading-none cursor-default">
                  {d.commit}
                </code>
              </Tooltip>
              {d.status === "building" && d.startedAt ? (
                <span className="text-xs font-mono text-foreground-300 flex-shrink-0">
                  <ElapsedTimer startedAt={d.startedAt} />
                </span>
              ) : (
                <span className="text-xs text-foreground-500 flex-shrink-0">{d.time}</span>
              )}
            </div>
            {i < deployments.length - 1 && <Divider spacing="none" size="sm" />}
          </div>
        ))}
      </Scroll>

    </div>
  );
}
