import React from 'react';

export * from '../dist/ui-lab-ui.es.js';

import {
  Card as CardRoot,
  CardBody,
  CardFooter,
  CardHeader,
} from '../dist/ui-lab-ui.es.js';

const Card = Object.assign(function Card(props) {
  return React.createElement(CardRoot, props);
}, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export { Card };
