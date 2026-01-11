"use client"

import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.card, className)}
      {...props}
    />
  )
);
CardRoot.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.header, className)}
      {...props}
    />
  )
);
CardHeader.displayName = "Card.Header";

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.body, className)}
      {...props}
    />
  )
);
CardBody.displayName = "Card.Body";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.footer, className)}
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
