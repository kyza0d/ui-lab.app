import type { ComponentPropsWithoutRef, JSX } from 'react';

export * from '../dist/ui-lab-ui.es.js';

import {
  Card as CardRoot,
  CardBody,
  CardFooter,
  CardHeader,
} from '../dist/ui-lab-ui.es.js';

type CardProps = ComponentPropsWithoutRef<typeof CardRoot>;
type CardHeaderProps = ComponentPropsWithoutRef<typeof CardHeader>;
type CardBodyProps = ComponentPropsWithoutRef<typeof CardBody>;
type CardFooterProps = ComponentPropsWithoutRef<typeof CardFooter>;

type CardCompoundComponent = ((props: CardProps) => JSX.Element) & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

// In Server Components, package-level client references do not preserve
// runtime-assigned static properties like `Card.Body`. Rebuilding the compound
// shape here keeps each slot as a direct export while preserving the API.
const Card = Object.assign(
  function Card(props: CardProps) {
    return <CardRoot {...props} />;
  },
  {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
  }
) as CardCompoundComponent;

export { Card };
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };
