"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MAX_NAVIGATIONS = 10;
const RESOURCE_WINDOW_MS = 5_000;
const OPEN_STORAGE_KEY = "ui-lab:perf-overlay:open";
const MINIMIZED_STORAGE_KEY = "ui-lab:perf-overlay:minimized";
const NETWORK_STORAGE_KEY = "ui-lab:perf-overlay:network-expanded";

export const PERF_OVERLAY_TOGGLE_EVENT = "ui-lab:perf-overlay:toggle";

type ResourceType = "document" | "script" | "fetch" | "style" | "image" | "other";

type ResourceLog = {
  id: string;
  name: string;
  pathname: string | null;
  type: ResourceType;
  size: number;
  duration: number;
  startTime: number;
  ttfbMs: number | null;
  waitMs: number | null;
  downloadMs: number | null;
  responseStatus: number | null;
  protocol: string | null;
  renderBlockingStatus: string | null;
  fromCache: boolean;
  isPrimary: boolean;
};

type LongTaskLog = {
  id: string;
  startTime: number;
  duration: number;
};

type NavigationLog = {
  id: string;
  previousPath: string;
  path: string;
  startedAt: number;
  routeCommitAt: number;
  firstPaintAt: number | null;
  interactiveAt: number | null;
  routeCommitMs: number | null;
  firstPaintMs: number | null;
  paintAfterCommitMs: number | null;
  interactiveMs: number | null;
  interactiveAfterCommitMs: number | null;
  totalDurationMs: number | null;
  totalBytes: number;
  jsBytes: number;
  fetchBytes: number;
  chunkCount: number;
  largestChunkBytes: number;
  requestCount: number;
  cachedRequestCount: number;
  primaryRequestCount: number;
  primaryRequestTtfbMs: number | null;
  primaryRequestWindowMs: number | null;
  primaryRequestBytes: number;
  longTasks: LongTaskLog[];
  longTaskCount: number;
  longTaskTotalMs: number;
  longTaskMaxMs: number;
  resources: ResourceLog[];
};

function formatDurationValue(value: number | null): string {
  return value === null || Number.isNaN(value) ? "n/a" : `${Math.round(value)}ms`;
}

function formatBytesValue(value: number): string {
  if (!value) {
    return "0 B";
  }

  if (value >= 1024 * 1024) {
    return `${(value / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (value >= 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${value} B`;
}

function buildNavigationReport(navigation: NavigationLog): string {
  const header = [
    `Navigation report: ${navigation.previousPath} -> ${navigation.path}`,
    "",
    "Timings",
    `- Total: ${formatDurationValue(navigation.totalDurationMs)}`,
    `- Route commit: ${formatDurationValue(navigation.routeCommitMs)}`,
    `- First paint: ${formatDurationValue(navigation.firstPaintMs)}`,
    `- Paint after commit: ${formatDurationValue(navigation.paintAfterCommitMs)}`,
    `- Hydration proxy: ${formatDurationValue(navigation.interactiveMs)}`,
    `- Hydration after commit: ${formatDurationValue(navigation.interactiveAfterCommitMs)}`,
    "",
    "Page request",
    `- Primary requests: ${navigation.primaryRequestCount}`,
    `- Primary TTFB: ${formatDurationValue(navigation.primaryRequestTtfbMs)}`,
    `- Primary request window: ${formatDurationValue(navigation.primaryRequestWindowMs)}`,
    `- Primary bytes: ${formatBytesValue(navigation.primaryRequestBytes)}`,
    "",
    "Network summary",
    `- Total bytes: ${formatBytesValue(navigation.totalBytes)}`,
    `- JS bytes: ${formatBytesValue(navigation.jsBytes)}`,
    `- Fetch/document bytes: ${formatBytesValue(navigation.fetchBytes)}`,
    `- Request count: ${navigation.requestCount}`,
    `- Cached requests: ${navigation.cachedRequestCount}`,
    `- JS chunk count: ${navigation.chunkCount}`,
    `- Largest JS chunk: ${formatBytesValue(navigation.largestChunkBytes)}`,
    "",
    "Main thread",
    `- Long task count: ${navigation.longTaskCount}`,
    `- Long task total: ${formatDurationValue(navigation.longTaskTotalMs)}`,
    `- Largest long task: ${formatDurationValue(navigation.longTaskMaxMs)}`,
    "",
    "Requests",
  ];

  const requests =
    navigation.resources.length === 0
      ? ["- No requests captured"]
      : navigation.resources.map((resource) => {
          const offset = Math.round(resource.startTime - navigation.startedAt);
          const flags = [
            resource.isPrimary ? "primary" : null,
            resource.fromCache ? "cached" : null,
            resource.renderBlockingStatus,
          ]
            .filter(Boolean)
            .join(", ");

          return [
            `- ${resource.name}`,
            `  type=${resource.type} size=${formatBytesValue(resource.size)} start=+${offset}ms total=${formatDurationValue(resource.duration)} ttfb=${formatDurationValue(resource.ttfbMs)} wait=${formatDurationValue(resource.waitMs)} download=${formatDurationValue(resource.downloadMs)}`,
            `  status=${resource.responseStatus ?? "n/a"} protocol=${resource.protocol ?? "n/a"}${flags ? ` flags=${flags}` : ""}`,
          ].join("\n");
        });

  const longTasks = [
    "",
    "Long tasks",
    ...(navigation.longTasks.length === 0
      ? ["- No long tasks captured"]
      : navigation.longTasks.map((task) => {
          const offset = Math.round(task.startTime - navigation.startedAt);
          return `- start=+${offset}ms duration=${formatDurationValue(task.duration)}`;
        })),
  ];

  return [...header, ...requests, ...longTasks].join("\n");
}

function buildAllNavigationsReport(navigations: NavigationLog[]): string {
  if (navigations.length === 0) {
    return "No navigation diagnostics captured.";
  }

  return navigations.map((navigation) => buildNavigationReport(navigation)).join("\n\n---\n\n");
}

async function copyTextToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.setAttribute("readonly", "true");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textArea);
      return copied;
    } catch {
      return false;
    }
  }
}

function formatDuration(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return "--";
  }

  return `${Math.round(value)}ms`;
}

function formatBytes(value: number): string {
  if (!value) {
    return "0 KB";
  }

  if (value >= 1024 * 1024) {
    return `${(value / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(value / 1024).toFixed(value >= 100 * 1024 ? 0 : 1)} KB`;
}

function getDurationTone(duration: number | null): string {
  if (duration === null) {
    return "text-foreground-400";
  }

  if (duration < 300) {
    return "text-emerald-400";
  }

  if (duration <= 1_000) {
    return "text-amber-300";
  }

  return "text-red-400";
}

function truncateResourceName(value: string): string {
  try {
    const url = new URL(value);
    const path = `${url.pathname}${url.search}`;
    if (path.length <= 52) {
      return path;
    }

    return `${path.slice(0, 24)}...${path.slice(-24)}`;
  } catch {
    if (value.length <= 52) {
      return value;
    }

    return `${value.slice(0, 24)}...${value.slice(-24)}`;
  }
}

function getUrlPathname(value: string): string | null {
  try {
    return new URL(value, window.location.origin).pathname;
  } catch {
    return null;
  }
}

function getResourceType(entry: PerformanceResourceTiming): ResourceType {
  const name = entry.name.toLowerCase();
  const initiator = entry.initiatorType.toLowerCase();

  if (initiator === "navigation") {
    return "document";
  }

  if (
    initiator === "script" ||
    initiator === "link" ||
    name.endsWith(".js") ||
    name.includes("/_next/static/")
  ) {
    return "script";
  }

  if (initiator === "fetch" || initiator === "xmlhttprequest") {
    return "fetch";
  }

  if (initiator === "css" || name.endsWith(".css")) {
    return "style";
  }

  if (initiator === "img" || initiator === "image") {
    return "image";
  }

  return "other";
}

function getResourceSize(entry: PerformanceResourceTiming): number {
  return entry.transferSize || entry.encodedBodySize || entry.decodedBodySize || 0;
}

function getResponseStatus(entry: PerformanceResourceTiming): number | null {
  if ("responseStatus" in entry && typeof entry.responseStatus === "number") {
    return entry.responseStatus;
  }

  return null;
}

function getProtocol(entry: PerformanceResourceTiming): string | null {
  return entry.nextHopProtocol || null;
}

function getRenderBlockingStatus(entry: PerformanceResourceTiming): string | null {
  if ("renderBlockingStatus" in entry && typeof entry.renderBlockingStatus === "string") {
    return entry.renderBlockingStatus;
  }

  return null;
}

function getPrimaryRequestPath(value: string): string | null {
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin) {
      return null;
    }

    return url.pathname;
  } catch {
    return null;
  }
}

function isPrimaryRequest(entry: PerformanceResourceTiming, targetPath: string): boolean {
  const requestPath = getPrimaryRequestPath(entry.name);
  if (!requestPath || requestPath !== targetPath) {
    return false;
  }

  const initiator = entry.initiatorType.toLowerCase();
  const url = new URL(entry.name, window.location.origin);

  return (
    initiator === "fetch" ||
    initiator === "xmlhttprequest" ||
    initiator === "navigation" ||
    url.searchParams.has("_rsc")
  );
}

function resolveNavigationPath(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest("a[href]");
  if (anchor instanceof HTMLAnchorElement) {
    try {
      const url = new URL(anchor.href, window.location.href);
      return url.origin === window.location.origin ? url.pathname : null;
    } catch {
      return null;
    }
  }

  const buttonLike = target.closest('[role="button"]');
  if (buttonLike instanceof HTMLElement) {
    const previousSibling = buttonLike.previousElementSibling;
    if (previousSibling instanceof HTMLAnchorElement) {
      try {
        const url = new URL(previousSibling.href, window.location.href);
        return url.origin === window.location.origin ? url.pathname : null;
      } catch {
        return null;
      }
    }
  }

  return null;
}

function createNavigationLog(previousPath: string, path: string, startedAt: number): NavigationLog {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    previousPath,
    path,
    startedAt,
    routeCommitAt: performance.now(),
    firstPaintAt: null,
    interactiveAt: null,
    routeCommitMs: null,
    firstPaintMs: null,
    paintAfterCommitMs: null,
    interactiveMs: null,
    interactiveAfterCommitMs: null,
    totalDurationMs: null,
    totalBytes: 0,
    jsBytes: 0,
    fetchBytes: 0,
    chunkCount: 0,
    largestChunkBytes: 0,
    requestCount: 0,
    cachedRequestCount: 0,
    primaryRequestCount: 0,
    primaryRequestTtfbMs: null,
    primaryRequestWindowMs: null,
    primaryRequestBytes: 0,
    longTasks: [],
    longTaskCount: 0,
    longTaskTotalMs: 0,
    longTaskMaxMs: 0,
    resources: [],
  };
}

function updateNavigationMetrics(record: NavigationLog): NavigationLog {
  const totalBytes = record.resources.reduce((total, resource) => total + resource.size, 0);
  const scriptResources = record.resources.filter((resource) => resource.type === "script");
  const fetchBytes = record.resources
    .filter((resource) => resource.type === "fetch" || resource.type === "document")
    .reduce((total, resource) => total + resource.size, 0);
  const primaryResources = record.resources
    .filter((resource) => resource.isPrimary)
    .sort((left, right) => left.startTime - right.startTime);

  const primaryStartTime = primaryResources[0]?.startTime ?? null;
  const primaryEndTime =
    primaryResources.length > 0
      ? Math.max(...primaryResources.map((resource) => resource.startTime + resource.duration))
      : null;

  return {
    ...record,
    routeCommitMs: record.routeCommitAt - record.startedAt,
    firstPaintMs: record.firstPaintAt === null ? null : record.firstPaintAt - record.startedAt,
    paintAfterCommitMs:
      record.firstPaintAt === null ? null : record.firstPaintAt - record.routeCommitAt,
    interactiveMs:
      record.interactiveAt === null ? null : record.interactiveAt - record.startedAt,
    interactiveAfterCommitMs:
      record.interactiveAt === null ? null : record.interactiveAt - record.routeCommitAt,
    totalDurationMs:
      record.interactiveAt !== null
        ? record.interactiveAt - record.startedAt
        : record.firstPaintAt !== null
          ? record.firstPaintAt - record.startedAt
          : record.routeCommitAt - record.startedAt,
    totalBytes,
    jsBytes: scriptResources.reduce((total, resource) => total + resource.size, 0),
    fetchBytes,
    chunkCount: scriptResources.length,
    largestChunkBytes: scriptResources.reduce(
      (largest, resource) => Math.max(largest, resource.size),
      0,
    ),
    requestCount: record.resources.length,
    cachedRequestCount: record.resources.filter((resource) => resource.fromCache).length,
    primaryRequestCount: primaryResources.length,
    primaryRequestTtfbMs: primaryResources[0]?.ttfbMs ?? null,
    primaryRequestWindowMs:
      primaryStartTime === null || primaryEndTime === null ? null : primaryEndTime - primaryStartTime,
    primaryRequestBytes: primaryResources.reduce((total, resource) => total + resource.size, 0),
    longTaskCount: record.longTasks.length,
    longTaskTotalMs: record.longTasks.reduce((total, task) => total + task.duration, 0),
    longTaskMaxMs: record.longTasks.reduce((max, task) => Math.max(max, task.duration), 0),
  };
}

export function PerfOverlay() {
  const pathname = usePathname() ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isNetworkExpanded, setIsNetworkExpanded] = useState(true);
  const [networkRttMs, setNetworkRttMs] = useState<number | null>(null);
  const [isMeasuringRtt, setIsMeasuringRtt] = useState(false);
  const [navigations, setNavigations] = useState<NavigationLog[]>([]);
  const [selectedNavigationId, setSelectedNavigationId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const navigationsRef = useRef<NavigationLog[]>([]);
  const currentPathRef = useRef(pathname);
  const hasMountedRef = useRef(false);
  const pendingIntentRef = useRef<{ path: string; startedAt: number } | null>(null);
  const ignoreResourcePrefixRef = useRef<string | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const rafsRef = useRef<number[]>([]);

  const setAndPersistOpen = (nextValue: boolean | ((current: boolean) => boolean)) => {
    setIsOpen((current) => {
      const resolved = typeof nextValue === "function" ? nextValue(current) : nextValue;
      sessionStorage.setItem(OPEN_STORAGE_KEY, String(resolved));
      return resolved;
    });
  };

  const setAndPersistMinimized = (nextValue: boolean | ((current: boolean) => boolean)) => {
    setIsMinimized((current) => {
      const resolved = typeof nextValue === "function" ? nextValue(current) : nextValue;
      sessionStorage.setItem(MINIMIZED_STORAGE_KEY, String(resolved));
      return resolved;
    });
  };

  const setAndPersistNetworkExpanded = (nextValue: boolean | ((current: boolean) => boolean)) => {
    setIsNetworkExpanded((current) => {
      const resolved = typeof nextValue === "function" ? nextValue(current) : nextValue;
      sessionStorage.setItem(NETWORK_STORAGE_KEY, String(resolved));
      return resolved;
    });
  };

  const updateNavigations = (
    updater: NavigationLog[] | ((current: NavigationLog[]) => NavigationLog[]),
  ) => {
    setNavigations((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      navigationsRef.current = next;
      return next;
    });
  };

  const updateNavigation = (
    navigationId: string,
    updater: (navigation: NavigationLog) => NavigationLog,
  ) => {
    updateNavigations((current) =>
      current.map((navigation) =>
        navigation.id === navigationId ? updateNavigationMetrics(updater(navigation)) : navigation,
      ),
    );
  };

  const measureNetworkRtt = async () => {
    setIsMeasuringRtt(true);

    const probeUrl = `/?__perf_overlay_rtt=${Date.now()}`;
    ignoreResourcePrefixRef.current = `${window.location.origin}${probeUrl}`;
    const startedAt = performance.now();

    try {
      await fetch(probeUrl, {
        method: "HEAD",
        cache: "no-store",
      });
      setNetworkRttMs(performance.now() - startedAt);
    } catch {
      setNetworkRttMs(null);
    } finally {
      setIsMeasuringRtt(false);
      window.setTimeout(() => {
        ignoreResourcePrefixRef.current = null;
      }, 250);
    }
  };

  const copyReport = async (mode: "selected" | "all") => {
    const report =
      mode === "selected"
        ? selectedNavigation
          ? buildNavigationReport(selectedNavigation)
          : null
        : buildAllNavigationsReport(navigations);

    if (!report) {
      setCopyStatus("No navigation selected");
      return;
    }

    const copied = await copyTextToClipboard(report);
    setCopyStatus(copied ? mode === "selected" ? "Copied selected report" : "Copied full log" : "Copy failed");
    window.setTimeout(() => {
      setCopyStatus((current) =>
        current === "Copied selected report" ||
        current === "Copied full log" ||
        current === "Copy failed" ||
        current === "No navigation selected"
          ? null
          : current,
      );
    }, 2000);
  };

  useEffect(() => {
    const persistedOpen = sessionStorage.getItem(OPEN_STORAGE_KEY);
    const persistedMinimized = sessionStorage.getItem(MINIMIZED_STORAGE_KEY);
    const persistedNetworkExpanded = sessionStorage.getItem(NETWORK_STORAGE_KEY);

    if (persistedOpen !== null) {
      setIsOpen(persistedOpen === "true");
    }

    if (persistedMinimized !== null) {
      setIsMinimized(persistedMinimized === "true");
    }

    if (persistedNetworkExpanded !== null) {
      setIsNetworkExpanded(persistedNetworkExpanded === "true");
    }

    void measureNetworkRtt();
  }, []);

  useEffect(() => {
    const handleToggle = () => {
      setAndPersistOpen((current) => !current);
    };

    window.addEventListener(PERF_OVERLAY_TOGGLE_EVENT, handleToggle);
    return () => window.removeEventListener(PERF_OVERLAY_TOGGLE_EVENT, handleToggle);
  }, []);

  useEffect(() => {
    const markNavigationIntent = (target: EventTarget | null) => {
      const targetPath = resolveNavigationPath(target);
      if (!targetPath || targetPath === currentPathRef.current) {
        return;
      }

      pendingIntentRef.current = {
        path: targetPath,
        startedAt: performance.now(),
      };
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      markNavigationIntent(event.target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      markNavigationIntent(event.target);
    };

    const handlePopState = () => {
      pendingIntentRef.current = {
        path: window.location.pathname,
        startedAt: performance.now(),
      };
    };

    window.addEventListener("click", handleClick, true);
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!("PerformanceObserver" in window)) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];

      for (const entry of entries) {
        const ignoredPrefix = ignoreResourcePrefixRef.current;
        if (ignoredPrefix && entry.name.startsWith(ignoredPrefix)) {
          continue;
        }

        const entryPath = getUrlPathname(entry.name);
        const candidateByPath =
          entryPath === null
            ? undefined
            : navigationsRef.current.find(
                (navigation) =>
                  navigation.path === entryPath &&
                  entry.startTime >= navigation.routeCommitAt - RESOURCE_WINDOW_MS &&
                  entry.startTime <= navigation.routeCommitAt + RESOURCE_WINDOW_MS,
              );
        const candidateByTime = navigationsRef.current.find(
          (navigation) =>
            entry.startTime >= navigation.startedAt &&
            entry.startTime <= navigation.startedAt + RESOURCE_WINDOW_MS,
        );
        const navigation = candidateByPath ?? candidateByTime;

        if (!navigation) {
          continue;
        }

        const waitMs =
          entry.requestStart > 0 ? Math.max(0, entry.requestStart - entry.startTime) : null;
        const ttfbMs =
          entry.responseStart > 0 && entry.requestStart > 0
            ? Math.max(0, entry.responseStart - entry.requestStart)
            : null;
        const downloadMs =
          entry.responseEnd > 0 && entry.responseStart > 0
            ? Math.max(0, entry.responseEnd - entry.responseStart)
            : null;
        const isPrimary = isPrimaryRequest(entry, navigation.path);
        const resource: ResourceLog = {
          id: `${entry.name}:${entry.startTime.toFixed(2)}`,
          name: entry.name,
          pathname: entryPath,
          type: getResourceType(entry),
          size: getResourceSize(entry),
          duration: entry.duration,
          startTime: entry.startTime,
          ttfbMs,
          waitMs,
          downloadMs,
          responseStatus: getResponseStatus(entry),
          protocol: getProtocol(entry),
          renderBlockingStatus: getRenderBlockingStatus(entry),
          fromCache: entry.transferSize === 0 && entry.decodedBodySize > 0,
          isPrimary,
        };

        updateNavigation(navigation.id, (current) => {
          if (current.resources.some((existing) => existing.id === resource.id)) {
            return current;
          }

          const nextStartedAt =
            isPrimary && resource.startTime < current.startedAt ? resource.startTime : current.startedAt;

          return {
            ...current,
            startedAt: nextStartedAt,
            resources: [...current.resources, resource].sort(
              (left, right) => left.startTime - right.startTime,
            ),
          };
        });
      }
    });

    observer.observe({ type: "resource", buffered: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!("PerformanceObserver" in window)) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      for (const entry of entries) {
        const navigation = navigationsRef.current.find(
          (candidate) =>
            entry.startTime >= candidate.startedAt &&
            entry.startTime <= candidate.startedAt + RESOURCE_WINDOW_MS,
        );

        if (!navigation) {
          continue;
        }

        const longTask: LongTaskLog = {
          id: `${entry.startTime.toFixed(2)}:${entry.duration.toFixed(2)}`,
          startTime: entry.startTime,
          duration: entry.duration,
        };

        updateNavigation(navigation.id, (current) => {
          if (current.longTasks.some((existing) => existing.id === longTask.id)) {
            return current;
          }

          return {
            ...current,
            longTasks: [...current.longTasks, longTask].sort(
              (left, right) => left.startTime - right.startTime,
            ),
          };
        });
      }
    });

    try {
      observer.observe({ type: "longtask", buffered: true });
    } catch {
      return () => observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      currentPathRef.current = pathname;
      return;
    }

    if (pathname === currentPathRef.current) {
      return;
    }

    const previousPath = currentPathRef.current;
    currentPathRef.current = pathname;

    const pendingIntent = pendingIntentRef.current;
    const startedAt =
      pendingIntent && pendingIntent.path === pathname ? pendingIntent.startedAt : performance.now();
    pendingIntentRef.current = null;

    const navigation = createNavigationLog(previousPath, pathname, startedAt);

    updateNavigations((current) => [updateNavigationMetrics(navigation), ...current].slice(0, MAX_NAVIGATIONS));
    setSelectedNavigationId(navigation.id);

    const firstPaintRaf = window.requestAnimationFrame(() => {
      const secondPaintRaf = window.requestAnimationFrame(() => {
        updateNavigation(navigation.id, (current) => ({
          ...current,
          firstPaintAt: performance.now(),
        }));
      });
      rafsRef.current.push(secondPaintRaf);
    });
    rafsRef.current.push(firstPaintRaf);

    const interactiveTimeout = window.setTimeout(() => {
      updateNavigation(navigation.id, (current) => ({
        ...current,
        interactiveAt: performance.now(),
      }));
    }, 0);
    timeoutsRef.current.push(interactiveTimeout);
  }, [pathname]);

  useEffect(() => {
    return () => {
      for (const timeoutId of timeoutsRef.current) {
        window.clearTimeout(timeoutId);
      }

      for (const rafId of rafsRef.current) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const selectedNavigation =
    navigations.find((navigation) => navigation.id === selectedNavigationId) ?? navigations[0] ?? null;
  const lastNavigation = navigations[0] ?? null;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1000] w-[min(32rem,calc(100vw-2rem))] rounded-lg border border-background-700 bg-background-950/95 text-xs text-foreground-300 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-background-800 px-3 py-2">
        <span className="font-semibold text-foreground-50">Perf</span>
        <button
          type="button"
          onClick={() => void measureNetworkRtt()}
          className="rounded-full border border-background-700 px-2 py-0.5 text-[11px] text-foreground-300 transition hover:border-background-600 hover:text-foreground-100"
        >
          RTT: {isMeasuringRtt ? "..." : formatDuration(networkRttMs)}
        </button>
        <button
          type="button"
          onClick={() => void copyReport("selected")}
          className="rounded border border-background-700 px-2 py-0.5 text-[11px] text-foreground-300 transition hover:border-background-600 hover:text-foreground-100"
        >
          Copy Selected
        </button>
        <button
          type="button"
          onClick={() => void copyReport("all")}
          className="rounded border border-background-700 px-2 py-0.5 text-[11px] text-foreground-300 transition hover:border-background-600 hover:text-foreground-100"
        >
          Copy All
        </button>
        {copyStatus && <span className="text-[11px] text-foreground-500">{copyStatus}</span>}
        <span className="ml-auto text-[11px] text-foreground-500">Ctrl+D</span>
        <button
          type="button"
          aria-label={isMinimized ? "Expand performance overlay" : "Minimize performance overlay"}
          onClick={() => setAndPersistMinimized((current) => !current)}
          className="rounded border border-background-700 px-2 py-0.5 text-foreground-300 transition hover:border-background-600 hover:text-foreground-100"
        >
          {isMinimized ? "+" : "-"}
        </button>
        <button
          type="button"
          aria-label="Hide performance overlay"
          onClick={() => setAndPersistOpen(false)}
          className="rounded border border-background-700 px-2 py-0.5 text-foreground-300 transition hover:border-background-600 hover:text-foreground-100"
        >
          x
        </button>
      </div>

      {!isMinimized && (
        <div className="space-y-3 p-3">
          <div className="rounded-md border border-background-800 bg-background-900/60 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.2em] text-foreground-500">
                  Last Navigation
                </div>
                <div className="truncate pt-1 text-sm text-foreground-50">
                  {lastNavigation ? `${lastNavigation.previousPath} -> ${lastNavigation.path}` : "Waiting for navigation"}
                </div>
              </div>
              <div className={`shrink-0 font-semibold ${getDurationTone(lastNavigation?.totalDurationMs ?? null)}`}>
                {formatDuration(lastNavigation?.totalDurationMs ?? null)}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-foreground-400">
              <div className="rounded border border-background-800 px-2 py-1.5">
                <span className="text-foreground-500">Route commit</span>
                <div className="pt-1 text-foreground-100">
                  {formatDuration(lastNavigation?.routeCommitMs ?? null)}
                </div>
              </div>
              <div className="rounded border border-background-800 px-2 py-1.5">
                <span className="text-foreground-500">First paint</span>
                <div className="pt-1 text-foreground-100">
                  {formatDuration(lastNavigation?.firstPaintMs ?? null)}
                </div>
              </div>
              <div className="rounded border border-background-800 px-2 py-1.5">
                <span className="text-foreground-500">Hydration proxy</span>
                <div className="pt-1 text-foreground-100">
                  {formatDuration(lastNavigation?.interactiveMs ?? null)}
                </div>
              </div>
              <div className="rounded border border-background-800 px-2 py-1.5">
                <span className="text-foreground-500">Paint after commit</span>
                <div className="pt-1 text-foreground-100">
                  {formatDuration(lastNavigation?.paintAfterCommitMs ?? null)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border border-background-800 bg-background-900/60 px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-foreground-500">
                Page Request
              </div>
              <div className="pt-1 text-sm text-foreground-50">
                TTFB {formatDuration(lastNavigation?.primaryRequestTtfbMs ?? null)}
              </div>
              <div className="pt-1 text-[11px] text-foreground-400">
                {lastNavigation?.primaryRequestCount ?? 0} reqs | {formatBytes(lastNavigation?.primaryRequestBytes ?? 0)}
              </div>
            </div>
            <div className="rounded-md border border-background-800 bg-background-900/60 px-3 py-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-foreground-500">
                Main Thread
              </div>
              <div className="pt-1 text-sm text-foreground-50">
                {formatDuration(lastNavigation?.longTaskTotalMs ?? null)}
              </div>
              <div className="pt-1 text-[11px] text-foreground-400">
                {lastNavigation?.longTaskCount ?? 0} tasks | max {formatDuration(lastNavigation?.longTaskMaxMs ?? null)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-background-800 bg-background-900/60 px-3 py-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-foreground-500">
                Network Summary
              </div>
              <div className="pt-1 text-sm text-foreground-50">
                {formatBytes(lastNavigation?.totalBytes ?? 0)} total
              </div>
            </div>
            <div className="text-right text-[11px] text-foreground-400">
              <div>JS {formatBytes(lastNavigation?.jsBytes ?? 0)} | fetch {formatBytes(lastNavigation?.fetchBytes ?? 0)}</div>
              <div>{lastNavigation?.requestCount ?? 0} reqs | {lastNavigation?.cachedRequestCount ?? 0} cached</div>
            </div>
          </div>

          <div className="rounded-md border border-background-800 bg-background-900/60">
            <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_4.5rem] gap-2 border-b border-background-800 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-foreground-500">
              <span>Path</span>
              <span className="text-right">Total</span>
              <span className="text-right">Commit</span>
              <span className="text-right">JS</span>
            </div>
            <div className="max-h-56 overflow-y-auto">
              {navigations.length === 0 && (
                <div className="px-3 py-4 text-foreground-500">
                  Navigate between component pages to capture data.
                </div>
              )}
              {navigations.map((navigation) => (
                <button
                  key={navigation.id}
                  type="button"
                  onClick={() => setSelectedNavigationId(navigation.id)}
                  className={`grid w-full grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_4.5rem] gap-2 border-b border-background-800 px-3 py-2 text-left transition last:border-b-0 hover:bg-background-800/60 ${
                    selectedNavigation?.id === navigation.id ? "bg-background-800/80" : ""
                  }`}
                >
                  <span className="truncate text-foreground-200">{navigation.path}</span>
                  <span className={`text-right font-medium ${getDurationTone(navigation.totalDurationMs)}`}>
                    {formatDuration(navigation.totalDurationMs)}
                  </span>
                  <span className="text-right text-foreground-400">
                    {formatDuration(navigation.routeCommitMs)}
                  </span>
                  <span className="text-right text-foreground-400">{formatBytes(navigation.jsBytes)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-background-800 bg-background-900/60">
            <button
              type="button"
              onClick={() => setAndPersistNetworkExpanded((current) => !current)}
              className="flex w-full items-center justify-between px-3 py-2 text-left"
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-500">
                Network
              </span>
              <span className="text-foreground-300">
                {selectedNavigation ? `${selectedNavigation.requestCount} requests` : "0 requests"}
              </span>
            </button>

            {isNetworkExpanded && (
              <div className="border-t border-background-800">
                {selectedNavigation ? (
                  <>
                    <div className="px-3 py-2 text-[11px] text-foreground-500">
                      {selectedNavigation.previousPath} {"->"} {selectedNavigation.path}
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      <div className="grid grid-cols-[minmax(0,1fr)_4rem_4.5rem_4rem_4rem] gap-2 border-b border-background-800 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-foreground-500">
                        <span>Request</span>
                        <span>Type</span>
                        <span className="text-right">Size</span>
                        <span className="text-right">TTFB</span>
                        <span className="text-right">Time</span>
                      </div>
                      {selectedNavigation.resources.length === 0 && (
                        <div className="px-3 py-4 text-foreground-500">
                          No tracked requests in the first {RESOURCE_WINDOW_MS / 1000}s.
                        </div>
                      )}
                      {selectedNavigation.resources.map((resource) => {
                        const startOffset = resource.startTime - selectedNavigation.startedAt;
                        return (
                          <div
                            key={resource.id}
                            className="border-b border-background-800 px-3 py-2 last:border-b-0"
                          >
                            <div className="grid grid-cols-[minmax(0,1fr)_4rem_4.5rem_4rem_4rem] gap-2">
                              <div className="min-w-0">
                                <div
                                  className={`truncate ${resource.isPrimary ? "text-accent-300" : "text-foreground-200"}`}
                                  title={resource.name}
                                >
                                  {truncateResourceName(resource.name)}
                                </div>
                                <div className="pt-0.5 text-[11px] text-foreground-500">
                                  +{Math.round(startOffset)}ms {resource.fromCache ? "| cached" : ""}
                                </div>
                              </div>
                              <span className="text-foreground-400">{resource.type}</span>
                              <span className="text-right text-foreground-400">
                                {formatBytes(resource.size)}
                              </span>
                              <span className="text-right text-foreground-400">
                                {formatDuration(resource.ttfbMs)}
                              </span>
                              <span className="text-right text-foreground-400">
                                {formatDuration(resource.duration)}
                              </span>
                            </div>
                            <div className="pt-1 text-[11px] text-foreground-500">
                              {resource.responseStatus ?? "--"} | {resource.protocol ?? "--"} | wait {formatDuration(resource.waitMs)} | download {formatDuration(resource.downloadMs)}
                              {resource.renderBlockingStatus ? ` | ${resource.renderBlockingStatus}` : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="px-3 py-4 text-foreground-500">
                    Select a navigation to inspect its network activity.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
