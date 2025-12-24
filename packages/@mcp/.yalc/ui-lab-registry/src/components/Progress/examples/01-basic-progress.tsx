import React from 'react';
import { Progress } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Progress',
  description: 'A simple progress bar showing completion at 65%. Use this to display task or loading progress in your interface.'
};

export default function Example() {
  return <Progress value={65} />;
}
