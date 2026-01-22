import React from 'react';
import { Divider, Scroll } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaComputerMouse } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-scroll.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "70%" }} className="rounded-sm flex gap-2">
      <div className='w-full pr-4'>
        <div className='pt-3'>
          <div style={{ width: "60%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-2 mb-2'></div>
          <div style={{ width: "70%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1 mb-2'></div>
          <div style={{ width: "40%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1'></div>
        </div>

        <Divider size='sm' />
        <div className='pt-3'>
          <div style={{ width: "62%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1 mb-2'></div>
          <div style={{ width: "33%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1 mb-2'></div>
          <div style={{ width: "50%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1'></div>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--background-900)", height: 120, width: 9 }} className='relative rounded-base flex items-center flex'>
        <div style={{ backgroundColor: "var(--background-700)", height: 60, width: 5, left: 1.5, top: 2 }} className='absolute rounded-base'></div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-scroll', Component: Example1, metadata: metadata1 },
];


const scrollControls: ControlDef[] = [
  {
    name: "maxHeight",
    label: "Max Height",
    type: "select",
    options: [
      { label: "200px", value: "200px" },
      { label: "300px", value: "300px" },
      { label: "400px", value: "400px" },
    ],
    defaultValue: "300px",
  },
];

const scrollBasicCode = `import { Scroll } from "ui-lab-components";

export function Example() {
  return (
    <Scroll maxHeight="300px">
      <div className="p-4 space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-3 bg-background-700 rounded-base">
            Item {i + 1}
          </div>
        ))}
      </div>
    </Scroll>
  );
}`;

export const scrollDetail: ComponentDetail = {
  id: "scroll",
  name: "Scroll",
  description: "A custom scrollable container with styled scrollbars for both vertical and horizontal overflow",

  overview: (
    <div className="space-y-4 text-foreground-300" >
      <p>
        Scroll is a container component that provides custom scrollbars for handling overflowing content.It supports both vertical and horizontal scrolling with a consistent visual style that matches your design system.
      </p>
      <p>
        Use Scroll when you need to display a large amount of content in a fixed- size container, ensuring a smooth scrolling experience with styled scrollbars that integrate seamlessly with your UI.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: scrollBasicCode,
      preview: (
        <Scroll maxHeight="300px" >
          <div className="p-4 space-y-2">
            {
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 bg-background-700 rounded-base" >
                  Item {i + 1}
                </div>
              ))
            }
          </div>
        </Scroll>
      ),
      controls: scrollControls,
      renderPreview: () => (
        <Scroll style={{ height: "200px" }}>
          <div className="p-4 space-y-2" >
            {
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 bg-background-700 rounded-base" >
                  Item {i + 1}
                </div>
              ))}
          </div>
        </Scroll>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Scroll with standard 300px height for typical content",
      code: `<Scroll maxHeight="300px">
  <div className="p-4 space-y-2">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="p-3 bg-background-700 rounded-base">
        Item {i + 1}
      </div>
    ))}
  </div>
</Scroll>`,
      preview: (
        <Scroll maxHeight="300px" >
          <div className="p-4 space-y-2">
            {
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 bg-background-700 rounded-base" >
                  Item {i + 1}
                </div>
              ))
            }
          </div>
        </Scroll>
      ),
    },
  ],
};

export { scrollControls };
export * from './examples';
