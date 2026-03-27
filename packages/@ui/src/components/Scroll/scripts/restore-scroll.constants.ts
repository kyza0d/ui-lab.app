export const SCROLL_RESTORE_SELECTOR = "[data-ui-scroll-storage-key]";
export const SCROLL_RESTORE_STORAGE_KEY_ATTR = "data-ui-scroll-storage-key";
export const SCROLL_RESTORE_AXIS_ATTR = "data-ui-scroll-axis";
export const SCROLL_RESTORE_FLAG = "__uiLabScrollRestored";
export const SCROLL_RESTORE_DEBUG_SESSION_KEY = "__uiLabScrollRestoreDebug";
export const SCROLL_RESTORE_TRACE_KEY = "__uiLabScrollRestoreTrace";
export const SCROLL_RESTORE_NODE_REGISTRY_KEY = "__uiLabScrollRestoreNodeRegistry";
export const SCROLL_RESTORE_DEBUG_ID_KEY = "__uiLabScrollRestoreDebugId";

export function getScrollPositionProperty(
  direction: "vertical" | "horizontal",
): "scrollTop" | "scrollLeft" {
  return direction === "horizontal" ? "scrollLeft" : "scrollTop";
}

type ScrollRestoreWindow = Window & {
  __uiLabScrollRestoreDebug?: boolean;
  __uiLabScrollRestoreTrace?: Array<Record<string, unknown>>;
  __uiLabScrollRestoreNodeRegistry?: Record<string, HTMLDivElement>;
};

function getScrollRestoreWindow(): ScrollRestoreWindow | null {
  if (typeof window === "undefined") return null;

  return window as ScrollRestoreWindow;
}

export function isScrollRestoreDebugEnabled(): boolean {
  const scrollWindow = getScrollRestoreWindow();
  if (!scrollWindow) return false;
  if (scrollWindow.__uiLabScrollRestoreDebug === true) return true;

  try {
    return window.sessionStorage.getItem(SCROLL_RESTORE_DEBUG_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function recordScrollRestoreTrace(
  type: string,
  detail: Record<string, unknown> = {},
): void {
  if (!isScrollRestoreDebugEnabled()) return;

  const scrollWindow = getScrollRestoreWindow();
  if (!scrollWindow) return;

  const nextEntry = {
    type,
    t: typeof performance !== "undefined" && typeof performance.now === "function"
      ? performance.now()
      : Date.now(),
    readyState: typeof document === "undefined" ? null : document.readyState,
    ...detail,
  };

  const existingTrace = scrollWindow[SCROLL_RESTORE_TRACE_KEY];
  const trace = Array.isArray(existingTrace)
    ? (existingTrace as Array<Record<string, unknown>>)
    : [];

  trace.push(nextEntry);
  scrollWindow[SCROLL_RESTORE_TRACE_KEY] = trace;

  if (typeof performance !== "undefined" && typeof performance.mark === "function") {
    performance.mark(`ui-scroll:${type}`);
  }

  if (typeof console !== "undefined" && typeof console.debug === "function") {
    console.debug("[ui-scroll]", nextEntry);
  }
}

export function getBootstrapRestoredNode(storageKey: string): HTMLDivElement | null {
  const scrollWindow = getScrollRestoreWindow();
  if (!scrollWindow) return null;

  const registry = scrollWindow[SCROLL_RESTORE_NODE_REGISTRY_KEY];
  if (!registry || typeof registry !== "object") return null;

  return (registry as Record<string, HTMLDivElement>)[storageKey] ?? null;
}

export function getScrollRestoreDebugId(node: HTMLElement | null): string | null {
  if (!node) return null;

  const debugId = (node as HTMLElement & Record<string, unknown>)[SCROLL_RESTORE_DEBUG_ID_KEY];
  return typeof debugId === "string" ? debugId : null;
}

export function getScrollRestoreMetrics(
  node: HTMLDivElement,
  direction: "vertical" | "horizontal",
): {
  clientSize: number;
  scrollOffset: number;
  scrollSize: number;
  maxScroll: number;
} {
  const clientSize = direction === "horizontal" ? node.clientWidth : node.clientHeight;
  const scrollSize = direction === "horizontal" ? node.scrollWidth : node.scrollHeight;
  const scrollOffset = node[getScrollPositionProperty(direction)];

  return {
    clientSize,
    scrollOffset,
    scrollSize,
    maxScroll: Math.max(0, scrollSize - clientSize),
  };
}
