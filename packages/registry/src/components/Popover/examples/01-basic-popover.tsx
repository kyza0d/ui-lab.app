"use client";

import { Popover, Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic',
  description: 'Default popover with a short note and two clear actions.'
};

export default function Example() {
  return (
    <Popover
      content={
        <div className="w-64 space-y-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">Quick note</div>
            <p>A popover works best when it adds one small piece of context, one simple choice, or one short action.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Dismiss
            </Button>
            <Button size="sm">
              Continue
            </Button>
          </div>
        </div>
      }
    >
      <Button>Show info</Button>
    </Popover>
  );
}
