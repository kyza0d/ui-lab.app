"use client"

import React from "react";
import { cn } from "@/lib/utils";
import { type SlotStyleValue, createStylePropsResolver } from "@/lib/styles";
import styles from "./Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
  styles?: CardStylesProp;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

interface CardStyleSlots {
  root?: SlotStyleValue;
  header?: SlotStyleValue;
  body?: SlotStyleValue;
  footer?: SlotStyleValue;
}

type CardStylesProp = CardStyleSlots | SlotStyleValue;

const resolveCardBaseStyles = createStylePropsResolver(['root', 'header', 'body', 'footer'] as const);

type CardContextValue = ReturnType<typeof resolveCardBaseStyles> & {
  variantClassName: string;
};

const CardStylesContext = React.createContext<CardContextValue>({
  root: { className: '' },
  header: { className: '' },
  body: { className: '' },
  footer: { className: '' },
  variantClassName: 'default',
});

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, style, styles: stylesProp, variant = "default", ...props }, ref) => {
    const resolvedStyles = resolveCardBaseStyles(stylesProp);
    const contextValue = {
      ...resolvedStyles,
      variantClassName: variant,
    };

    return (
      <CardStylesContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('card', variant, styles.card, resolvedStyles.root.className, className)}
          style={{ ...resolvedStyles.root.style, ...style }}
          {...(props as any)}
        />
      </CardStylesContext.Provider>
    );
  }
);
CardRoot.displayName = "Card";

/** Top section of the card, typically containing a title or toolbar */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, style, ...props }, ref) => {
    const { header, variantClassName } = React.useContext(CardStylesContext);
    return (
      <div
        ref={ref}
        className={cn('card', 'header', variantClassName, styles.header, header.className, className)}
        style={{ ...header.style, ...style }}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "Card.Header";

/** Main content area of the card */
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, style, ...props }, ref) => {
    const { body, variantClassName } = React.useContext(CardStylesContext);
    return (
      <div
        ref={ref}
        className={cn('card', 'body', variantClassName, styles.body, body.className, className)}
        style={{ ...body.style, ...style }}
        {...props}
      />
    );
  }
);
CardBody.displayName = "Card.Body";

/** Bottom section of the card, typically containing actions */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, style, ...props }, ref) => {
    const { footer, variantClassName } = React.useContext(CardStylesContext);
    return (
      <div
        ref={ref}
        className={cn('card', 'footer', variantClassName, styles.footer, footer.className, className)}
        style={{ ...footer.style, ...style }}
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
