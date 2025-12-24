"use client";

import { ReactNode } from "react";
import { Button, Group } from "ui-lab-components";
import { FaMobile, FaDesktop } from "react-icons/fa6";

interface PreviewHeaderProps {
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
  deviceVariant: "mobile" | "desktop";
  onDeviceVariantChange: (variant: "mobile" | "desktop") => void;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
}

export function PreviewHeader({
  activeTab,
  onTabChange,
  deviceVariant,
  onDeviceVariantChange,
  leftContent,
  rightContent,
  className = "",
}: PreviewHeaderProps) {
  return (
    <div
      className={`flex border-b border-background-700 h-16 items-center px-6 justify-between flex-shrink-0 ${className}`}
    >
      <div className="flex items-center gap-3">
        {leftContent}
        <div className="flex gap-2">
          <Button
            onClick={() => onTabChange("preview")}
            variant={activeTab === "preview" ? "primary" : "outline"}
            size="sm"
          >
            Preview
          </Button>
          <Button
            onClick={() => onTabChange("code")}
            variant={activeTab === "code" ? "primary" : "outline"}
            size="sm"
          >
            Code
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Group variant="outline" spacing="compact">
          <Group.Button
            variant={deviceVariant === "mobile" ? "primary" : "ghost"}
            onClick={() => onDeviceVariantChange("mobile")}
          >
            <FaMobile size={14} />
          </Group.Button>
          <Group.Button
            variant={deviceVariant === "desktop" ? "primary" : "ghost"}
            onClick={() => onDeviceVariantChange("desktop")}
          >
            <FaDesktop size={14} />
          </Group.Button>
        </Group>
        {rightContent}
      </div>
    </div>
  );
}
