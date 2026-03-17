"use client";

import { useEffect, useLayoutEffect, useReducer, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { SettingsContent } from "./settings/settings-content";
import { HiX } from "react-icons/hi";

interface FloatingSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const DIALOG_WIDTH = 350;
const DIALOG_HEIGHT = 472;
const GAP = 12;
const EDGE_PADDING = 16;

interface DialogState {
  basePosition: { top: number; left: number } | null;
  dragOffset: { x: number; y: number };
  isDragging: boolean;
}

type DialogAction =
  | { type: "set-base-position"; position: DialogState["basePosition"] }
  | { type: "set-drag-offset"; offset: DialogState["dragOffset"] }
  | { type: "set-dragging"; value: boolean }
  | { type: "reset-position" };

const INITIAL_DIALOG_STATE: DialogState = {
  basePosition: null,
  dragOffset: { x: 0, y: 0 },
  isDragging: false,
};

function dialogReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case "set-base-position":
      return { ...state, basePosition: action.position };
    case "set-drag-offset":
      return { ...state, dragOffset: action.offset };
    case "set-dragging":
      return { ...state, isDragging: action.value };
    case "reset-position":
      return { ...state, basePosition: null, dragOffset: { x: 0, y: 0 } };
    default:
      return state;
  }
}

export const SettingsDialog = ({
  isOpen,
  onOpenChange,
  triggerRef,
}: FloatingSettingsDialogProps) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const [dialogState, dispatch] = useReducer(dialogReducer, INITIAL_DIALOG_STATE);

  // Refs for drag math
  const dragStartRef = useRef<{ startX: number; startY: number; initialOffsetX: number; initialOffsetY: number } | null>(null);

  // Persists the last effective position across open/close cycles
  const lastPositionRef = useRef<{ top: number; left: number } | null>(null);
  const currentPositionRef = useRef<{ top: number; left: number } | null>(null);

  // ---------------------------------------------------------------------------
  // Positioning Logic (Viewport Relative)
  // ---------------------------------------------------------------------------
  // Keep currentPositionRef in sync with the effective rendered position
  useEffect(() => {
    if (dialogState.basePosition !== null) {
      currentPositionRef.current = {
        top: dialogState.basePosition.top + dialogState.dragOffset.y,
        left: dialogState.basePosition.left + dialogState.dragOffset.x,
      };
    }
  }, [dialogState.basePosition, dialogState.dragOffset]);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef?.current || !mounted) {
      if (!isOpen) {
        if (currentPositionRef.current) {
          lastPositionRef.current = currentPositionRef.current;
        }
        dispatch({ type: "reset-position" });
      }
      return;
    }

    const calculatePosition = () => {
      if (lastPositionRef.current) {
        dispatch({ type: "set-base-position", position: lastPositionRef.current });
        return;
      }

      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      let left = triggerRect.left + (triggerRect.width / 2) - (DIALOG_WIDTH / 2);
      if (left < EDGE_PADDING) left = EDGE_PADDING;
      if (left + DIALOG_WIDTH > viewportW - EDGE_PADDING) {
        left = viewportW - DIALOG_WIDTH - EDGE_PADDING;
      }
      let top = triggerRect.bottom + GAP;

      // Flip if overflow bottom
      if (top + DIALOG_HEIGHT > viewportH - EDGE_PADDING) {
        const topAbove = triggerRect.top - DIALOG_HEIGHT - GAP;

        if (topAbove >= EDGE_PADDING) {
          top = topAbove;
        } else {
          if (top + DIALOG_HEIGHT > viewportH) {
            top = viewportH - DIALOG_HEIGHT - EDGE_PADDING;
          }
        }
      }

      dispatch({ type: "set-base-position", position: { top, left } });
    };

    calculatePosition();

    const handleResizeScroll = () => calculatePosition();
    const scrollListenerOptions = { capture: true, passive: true } as const;
    window.addEventListener("resize", handleResizeScroll);
    window.addEventListener("scroll", handleResizeScroll, scrollListenerOptions);

    return () => {
      window.removeEventListener("resize", handleResizeScroll);
      window.removeEventListener("scroll", handleResizeScroll, scrollListenerOptions);
    };
  }, [isOpen, triggerRef, mounted]);

  // ---------------------------------------------------------------------------
  // Drag Logic
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!dialogState.isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;

      dispatch({
        type: "set-drag-offset",
        offset: {
          x: dragStartRef.current.initialOffsetX + deltaX,
          y: dragStartRef.current.initialOffsetY + deltaY,
        },
      });
    };

    const handleMouseUp = () => {
      dispatch({ type: "set-dragging", value: false });
      dragStartRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dialogState.isDragging]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-drag-handle]")) return;

    e.preventDefault();
    dispatch({ type: "set-dragging", value: true });
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialOffsetX: dialogState.dragOffset.x,
      initialOffsetY: dialogState.dragOffset.y,
    };
  };

  if (!mounted || !isOpen) return null;

  const isReady = dialogState.basePosition !== null;
  const top = (dialogState.basePosition?.top ?? 0) + dialogState.dragOffset.y;
  const left = (dialogState.basePosition?.left ?? 0) + dialogState.dragOffset.x;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9998] pointer-events-none" suppressHydrationWarning />
      <div
        ref={dialogRef}
        onMouseDown={handleDragStart}
        role="dialog"
        aria-modal="false"
        tabIndex={-1}
        style={{
          position: "fixed",
          top,
          left,
          width: DIALOG_WIDTH,
          height: DIALOG_HEIGHT,
          opacity: isReady ? 1 : 0,
          pointerEvents: isReady ? "auto" : "none",
        }}
        className="fixed z-[9999] rounded-[16px] border border-background-600 bg-background-900/95 backdrop-blur-md flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onOpenChange(false);
        }}
      >
        <div
          data-drag-handle
          className="h-10 shrink-0 bg-background-800 border-b border-background-700 cursor-grab active:cursor-grabbing flex items-center justify-between pl-4 pr-2 select-none hover:bg-background-800/70 transition-colors"
        >
          <span className="text-xs font-semibold text-foreground-400 pointer-events-none">
            Theme Settings
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenChange(false);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="text-foreground-400 hover:text-foreground-300 transition-colors flex items-center justify-center w-6 h-6 rounded hover:bg-background-700/50 cursor-pointer"
            aria-label="Close settings"
          >
            <HiX />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <SettingsContent />
        </div>
      </div>
    </>,
    document.body
  );
};
