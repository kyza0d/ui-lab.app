"use client";

import { useRef, useState, useEffect } from "react";
import { useFloating, offset, flip, shift, Placement } from "@floating-ui/react-dom";
import { SettingsContent } from "./settings/settings-content";

interface FloatingSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const FloatingSettingsDialog = ({
  isOpen,
  onOpenChange,
  triggerRef,
}: FloatingSettingsDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cumulativeOffset, setCumulativeOffset] = useState({ x: 0, y: 0 });
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    baseOffsetX: 0,
    baseOffsetY: 0,
  });

  const { floatingStyles } = useFloating({
    placement: "bottom-end" as Placement,
    middleware: [
      offset(10),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
    elements: {
      reference: triggerRef?.current || undefined,
    },
  });

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStateRef.current.startX;
      const deltaY = e.clientY - dragStateRef.current.startY;

      setCumulativeOffset({
        x: dragStateRef.current.baseOffsetX + deltaX,
        y: dragStateRef.current.baseOffsetY + deltaY,
      });
    };

    const handleMouseUp = () => {
      dragStateRef.current.baseOffsetX = cumulativeOffset.x;
      dragStateRef.current.baseOffsetY = cumulativeOffset.y;
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, cumulativeOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-drag-handle]")) {
      dragStateRef.current.startX = e.clientX;
      dragStateRef.current.startY = e.clientY;
      // baseOffset is already set from previous drag or stays at 0
      setIsDragging(true);
      e.preventDefault();
    }
  };

  if (!isOpen) return null;

  // Use transform to move the dialog while preserving floatingStyles
  const dialogStyle = {
    ...floatingStyles,
    transform: `translate(${cumulativeOffset.x}px, ${cumulativeOffset.y}px)`,
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        ref={dialogRef}
        style={dialogStyle}
        className="fixed z-[9999] w-100 h-143 rounded-[16px] border border-background-600 bg-background-900/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        <div
          data-drag-handle
          className="h-10 shrink-0 bg-gradient-to-b from-background-800/50 to-background-900/50 border-b border-background-700 cursor-grab active:cursor-grabbing flex items-center px-4 select-none hover:bg-background-800/70 transition-colors"
        >
          <span className="text-sm font-semibold text-foreground-400">
            Theme Settings
          </span>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <SettingsContent />
        </div>
      </div>
    </>
  );
};
