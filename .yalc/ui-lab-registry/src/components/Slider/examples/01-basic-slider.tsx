import React from 'react';
import { Slider } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Slider',
  description: 'A simple range slider with a default value. Perfect for adjusting values within a range like volume or brightness.'
};

export default function Example() {
  return <Slider.Root min={0} max={100} defaultValue={[50]} />;
}
