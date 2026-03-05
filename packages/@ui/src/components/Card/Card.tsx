"use client"

import React from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  styles?: CardStylesProp;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface CardStyleSlots {
  root?: StyleValue;
  header?: StyleValue;
  body?: StyleValue;
  footer?: StyleValue;
}

export type CardStylesProp = StylesProp<CardStyleSlots>;

const resolveCardBaseStyles = createStylesResolver(['root', 'header', 'body', 'footer'] as const);

const CardStylesContext = React.createContext<Record<keyof CardStyleSlots, string>>({
  root: '',
  header: '',
  body: '',
  footer: '',
});

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, styles: stylesProp, ...props }, ref) => {
    const resolvedStyles = resolveCardBaseStyles(stylesProp);
    return (
      <CardStylesContext.Provider value={resolvedStyles}>
        <div
          ref={ref}
          className={cn(styles.card, resolvedStyles.root, className)}
          {...props}
        />
      </CardStylesContext.Provider>
    );
  }
);
CardRoot.displayName = "Card";

/** Top section of the card, typically containing a title or toolbar */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    const { header } = React.useContext(CardStylesContext);
    return (
      <div
        ref={ref}
        className={cn(styles.header, header, className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "Card.Header";

/** Main content area of the card */
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => {
    const { body } = React.useContext(CardStylesContext);
    return (
      <div
        ref={ref}
        className={cn(styles.body, body, className)}
        {...props}
      />
    );
  }
);
CardBody.displayName = "Card.Body";

/** Bottom section of the card, typically containing actions */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    const { footer } = React.useContext(CardStylesContext);
    return (
      <div
        ref={ref}
        className={cn(styles.footer, footer, className)}
        {...props}
      />
    );
  }
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
