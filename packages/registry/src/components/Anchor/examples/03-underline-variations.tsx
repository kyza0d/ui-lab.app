import React from 'react';
import { Anchor } from 'ui-lab-components';

export const metadata = {
  title: 'Anchor Underline Variations',
  description: 'Customizing the anchor underline style using the Anchor.Underline compound component.'
};

export default function Example() {
  return (
    <div className="flex flex-col gap-6 items-start">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground-300">Solid (Default)</h4>
        <Anchor>
          Solid Underline
          <Anchor.Underline variant="solid" />
          <Anchor.Preview>
            <div className="text-sm">Default solid underline</div>
          </Anchor.Preview>
        </Anchor>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground-300">Dashed</h4>
        <Anchor>
          Dashed Underline
          <Anchor.Underline variant="dashed" />
          <Anchor.Preview>
            <div className="text-sm">Dashed underline variant</div>
          </Anchor.Preview>
        </Anchor>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground-300">Dotted</h4>
        <Anchor>
          Dotted Underline
          <Anchor.Underline variant="dotted" />
          <Anchor.Preview>
            <div className="text-sm">Dotted underline variant</div>
          </Anchor.Preview>
        </Anchor>
      </div>
      
       <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground-300">Custom Color</h4>
        <Anchor>
          Colored Underline
          <Anchor.Underline style={{ background: '#3b82f6' }} />
          <Anchor.Preview>
            <div className="text-sm">Underline with custom inline style</div>
          </Anchor.Preview>
        </Anchor>
      </div>
    </div>
  );
}
