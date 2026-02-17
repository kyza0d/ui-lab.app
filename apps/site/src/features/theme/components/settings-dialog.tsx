"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { SettingsContent } from "./settings/settings-content";
import { HiX } from "react-icons/hi";

interface FloatingSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const DIALOG_WIDTH = 400;
const DIALOG_HEIGHT = 572;
const GAP = 12;
const EDGE_PADDING = 16;

export const SettingsDialog = ({
  isOpen,
  onOpenChange,
  triggerRef,
}: FloatingSettingsDialogProps) => {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Position is separate from drag offset
  const [basePosition, setBasePosition] = useState<{ top: number; left: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Refs for drag math
  const dragStartRef = useRef<{ startX: number; startY: number; initialOffsetX: number; initialOffsetY: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ---------------------------------------------------------------------------
  // Positioning Logic (Viewport Relative)
  // ---------------------------------------------------------------------------
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef?.current || !mounted) {
      if (!isOpen) {
        setBasePosition(null);
        setDragOffset({ x: 0, y: 0 });
      }
      return;
    }

    const calculatePosition = () => {
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

      setBasePosition({ top, left });
    };

    calculatePosition();

    const handleResizeScroll = () => calculatePosition();
    window.addEventListener("resize", handleResizeScroll);
    window.addEventListener("scroll", handleResizeScroll, { capture: true });

    return () => {
      window.removeEventListener("resize", handleResizeScroll);
      window.removeEventListener("scroll", handleResizeScroll, { capture: true });
    };
  }, [isOpen, triggerRef, mounted]);

  // ---------------------------------------------------------------------------
  // Drag Logic
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.startX;
      const deltaY = e.clientY - dragStartRef.current.startY;

      setDragOffset({
        x: dragStartRef.current.initialOffsetX + deltaX,
        y: dragStartRef.current.initialOffsetY + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-drag-handle]")) return;

    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialOffsetX: dragOffset.x,
      initialOffsetY: dragOffset.y,
    };
  };

  if (!mounted || !isOpen) return null;

  const isReady = basePosition !== null;
  const top = (basePosition?.top ?? 0) + dragOffset.y;
  const left = (basePosition?.left ?? 0) + dragOffset.x;

  // ---------------------------------------------------------------------------
  // Render via Portal (Safely escapes any parent transforms)
  // ---------------------------------------------------------------------------
  return createPortal(
    <>
      <div className="fixed inset-0 z-[9998] pointer-events-none" />
      <div
        ref={dialogRef}
        onMouseDown={handleDragStart}
        style={{
          position: "fixed",
          top,
          left,
          width: DIALOG_WIDTH,
          height: DIALOG_HEIGHT,
          opacity: isReady ? 1 : 0,
          pointerEvents: isReady ? "auto" : "none",
        }}
        className="fixed z-[9999] rounded-[16px] border border-background-600 bg-background-900/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          data-drag-handle
          className="h-10 shrink-0 bg-background-800 border-b border-background-700 cursor-grab active:cursor-grabbing flex items-center justify-between px-4 select-none hover:bg-background-800/70 transition-colors"
        >
          <span className="text-sm font-semibold text-foreground-400 pointer-events-none">
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
