"use client"

import React from "react";
import { cn } from "@/lib/utils";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "default" | "sidebar-left" | "sidebar-right";
}

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface PageSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "sm" | "md" | "lg";
}

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {}

interface PageFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const sidebarWidths = {
  sm: "w-48",
  md: "w-64",
  lg: "w-80",
};

const PageRoot = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, layout = "default", ...props }, ref) => {
    const layoutClass = layout === "sidebar-left"
      ? "flex flex-row"
      : layout === "sidebar-right"
      ? "flex flex-row-reverse"
      : "flex flex-col";

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen bg-background-900 text-foreground-50",
          layoutClass,
          className
        )}
        {...props}
      />
    );
  }
);
PageRoot.displayName = "Page";

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border-b border-background-700 bg-background-800 px-6 py-4",
        className
      )}
      {...props}
    />
  )
);
PageHeader.displayName = "Page.Header";

const PageSidebar = React.forwardRef<HTMLDivElement, PageSidebarProps>(
  ({ className, width = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        sidebarWidths[width],
        "border-r border-background-700 bg-background-800 overflow-y-auto",
        className
      )}
      {...props}
    />
  )
);
PageSidebar.displayName = "Page.Sidebar";

const PageContent = React.forwardRef<HTMLDivElement, PageContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto p-6",
        className
      )}
      {...props}
    />
  )
);
PageContent.displayName = "Page.Content";

const PageFooter = React.forwardRef<HTMLDivElement, PageFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border-t border-background-700 bg-background-800 px-6 py-4",
        className
      )}
      {...props}
    />
  )
);
PageFooter.displayName = "Page.Footer";

const Page = Object.assign(PageRoot, {
  Header: PageHeader,
  Sidebar: PageSidebar,
  Content: PageContent,
  Footer: PageFooter,
});

export { Page, PageHeader, PageSidebar, PageContent, PageFooter };
export type { PageProps, PageHeaderProps, PageSidebarProps, PageContentProps, PageFooterProps };
