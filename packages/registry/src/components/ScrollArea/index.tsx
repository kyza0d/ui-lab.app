import { ScrollArea } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-scrollarea.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-scrollarea', Component: Example1, metadata: metadata1 },
];


const scrollareaControls: ControlDef[] = [
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

const scrollareaBasicCode = `import { Scrollarea } from "ui-lab-components";

export function Example() {
  return (
    <Scrollarea maxHeight="300px">
      <div className="p-4 space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-3 bg-background-700 rounded-md">
            Item {i + 1}
          </div>
        ))}
      </div>
    </Scrollarea>
  );
}`;

export const scrollareaDetail: ComponentDetail = {
  id: "scrollarea",
  name: "ScrollArea",
  description: "A custom scrollable container with styled scrollbars for both vertical and horizontal overflow",

  overview: (
    <div className="space-y-4 text-foreground-300" >
      <p>
        ScrollArea is a container component that provides custom scrollbars for handling overflowing content.It supports both vertical and horizontal scrolling with a consistent visual style that matches your design system.
      </p>
      <p>
        Use ScrollArea when you need to display a large amount of content in a fixed- size container, ensuring a smooth scrolling experience with styled scrollbars that integrate seamlessly with your UI.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: scrollareaBasicCode,
      preview: (
        <ScrollArea maxHeight="300px" >
          <div className="p-4 space-y-2">
            {
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 bg-background-700 rounded-md" >
                  Item {i + 1}
                </div>
              ))
            }
          </div>
        </ScrollArea>
      ),
      controls: scrollareaControls,
      renderPreview: () => (
        <ScrollArea style={{ height: "200px" }}>
          <div className="p-4 space-y-2" >
            {
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 bg-background-700 rounded-md" >
                  Item {i + 1}
                </div>
              ))}
          </div>
        </ScrollArea>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "ScrollArea with standard 300px height for typical content",
      code: `<Scrollarea maxHeight="300px">
  <div className="p-4 space-y-2">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="p-3 bg-background-700 rounded-md">
        Item {i + 1}
      </div>
    ))}
  </div>
</Scrollarea>`,
      preview: (
        <ScrollArea maxHeight="300px" >
          <div className="p-4 space-y-2">
            {
              Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="p-3 bg-background-700 rounded-md" >
                  Item {i + 1}
                </div>
              ))
            }
          </div>
        </ScrollArea>
      ),
    },
  ],
};

export { scrollareaControls };
export * from './examples';
