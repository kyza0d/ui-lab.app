import React from 'react';
import { Mask } from 'ui-lab-components';

export const metadata = {
  title: 'Mask - Read More Effect',
  description: 'Using the mask component to create a smooth fade effect on long text content.'
};

export default function Example() {
  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg bg-background">
      <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
      <Mask className="h-48 bg-muted/30 rounded-md p-4">
        <Mask.Fade direction="top" intensity={0.8} fixed />
        <Mask.Fade direction="bottom" intensity={0.8} fixed />
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </div>
      </Mask>
    </div>
  );
}
