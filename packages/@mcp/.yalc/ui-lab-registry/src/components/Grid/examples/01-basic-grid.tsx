import React from 'react';
import { Grid } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Grid',
  description: 'A simple grid layout with multiple cells. Use this for organizing content in a responsive grid structure.'
};

export default function Example() {
  return (
    <Grid columns="3" gap="md">
      <div style={{ padding: '1rem', background: '#e0e0e0' }}>Cell 1</div>
      <div style={{ padding: '1rem', background: '#d0d0d0' }}>Cell 2</div>
      <div style={{ padding: '1rem', background: '#c0c0c0' }}>Cell 3</div>
      <div style={{ padding: '1rem', background: '#b0b0b0' }}>Cell 4</div>
      <div style={{ padding: '1rem', background: '#a0a0a0' }}>Cell 5</div>
      <div style={{ padding: '1rem', background: '#909090' }}>Cell 6</div>
    </Grid>
  );
}
