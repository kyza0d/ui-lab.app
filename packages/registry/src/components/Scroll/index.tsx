import React from 'react';
import { Divider, Scroll } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaComputerMouse } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-scroll.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

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
          <div key={i} className="p-3 bg-background-700 rounded-md">
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
                <div key={i} className="p-3 bg-background-700 rounded-md" >
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
                <div key={i} className="p-3 bg-background-700 rounded-md" >
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
      <div key={i} className="p-3 bg-background-700 rounded-md">
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
                <div key={i} className="p-3 bg-background-700 rounded-md" >
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
