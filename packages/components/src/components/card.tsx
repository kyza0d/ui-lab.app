"use client"

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-background-800 border border-background-700 rounded-lg overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
CardRoot.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-4 border-b border-background-700",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "Card.Header";

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-4 py-2",
        className
      )}
      {...props}
    />
  )
);
CardBody.displayName = "Card.Body";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2 py-2 border-t border-background-700 bg-background-900/50",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "Card.Footer";

// Compound component
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { Card, CardHeader, CardBody, CardFooter };
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };
