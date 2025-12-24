import React from 'react';
import { Radio } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Radio',
  description: 'A simple radio button option with a label. Use this for single-choice selection in forms and settings.'
};

export default function Example() {
  return (
    <Radio value="option1" label="Select this option" />
  );
}
