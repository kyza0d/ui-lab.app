import React, { useState } from "react";
import { Fold } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

function BasicFoldPreview(props: any) {
  return (
    <div className="w-full max-w-(--page-width)d mx-auto">
      <Fold title="What is a Fold component?" defaultExpanded={props.expanded}>
        <p className="text-foreground-300">
          A Fold component is a disclosure widget that expands and collapses content. It's built with React Aria for full accessibility support, including keyboard navigation and proper ARIA attributes.
        </p>
      </Fold>
    </div>
  );
}

function AccordionPreview(props: any) {
  return (
    <div className="w-full max-w-(--page-width)d mx-auto space-y-2">
      <Fold title="Section One" defaultExpanded={props.expanded}>
        <p className="text-foreground-300">
          This is the first section of content. Each fold can be independently expanded or collapsed.
        </p>
      </Fold>

      <Fold title="Section Two">
        <p className="text-foreground-300">
          This is the second section of content. Click the header to expand or collapse this section.
        </p>
      </Fold>

      <Fold title="Section Three">
        <p className="text-foreground-300">
          This is the third section of content. You can have as many folds as you need in a list.
        </p>
      </Fold>

      <Fold title="Section Four">
        <p className="text-foreground-300">
          All sections can be expanded simultaneously, making this different from a traditional accordion.
        </p>
      </Fold>
    </div>
  );
}

function RichContentFoldPreview(props: any) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: "accessible",
      title: "Fully Accessible",
      description: "Built with React Aria for WCAG 2.1 Level AA compliance.",
      details: [
        "Keyboard navigation (Tab, Enter/Space)",
        "Proper ARIA disclosure pattern",
        "Screen reader friendly",
        "Focus management",
      ],
    },
    {
      id: "responsive",
      title: "Responsive Design",
      description: "Adapts to any screen size automatically.",
      details: [
        "Mobile-friendly interactions",
        "Touch-friendly trigger buttons",
        "Smooth animations",
        "Semantic HTML structure",
      ],
    },
    {
      id: "customizable",
      title: "Highly Customizable",
      description: "Flexible styling and behavior options.",
      details: [
        "Custom CSS class support",
        "Controlled and uncontrolled modes",
        "Disabled state support",
        "Event callbacks for state changes",
      ],
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {features.map((feature) => (
        <Fold
          key={feature.id}
          title={
            <div className="flex items-start gap-3 py-1">
              <div className="flex-1">
                <div className="font-semibold text-foreground-50">
                  {feature.title}
                </div>
                <div className="text-sm text-foreground-400">
                  {feature.description}
                </div>
              </div>
            </div>
          }
          defaultExpanded={selectedFeature === feature.id}
          onExpandedChange={(expanded) =>
            setSelectedFeature(expanded ? feature.id : null)
          }
        >
          <ul className="space-y-2">
            {feature.details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-foreground-300 text-sm"
              >
                <span className="text-accent-400 font-bold flex-shrink-0">
                  •
                </span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </Fold>
      ))}
    </div>
  );
}

const foldControls: ControlDef[] = [
  {
    name: "expanded",
    label: "Default Expanded",
    type: "toggle",
    defaultValue: false,
  },
];

const basicFoldCode = `import { Fold } from "ui-lab-components";

export function Example() {
  return (
    <Fold title="What is a Fold component?">
      <p>
        A Fold component is a disclosure widget that expands and collapses content.
        It's built with React Aria for full accessibility support.
      </p>
    </Fold>
  );
}`;

const accordionCode = `import { Fold } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-2">
      <Fold title="Section One" defaultExpanded>
        <p>This is the first section of content.</p>
      </Fold>

      <Fold title="Section Two">
        <p>This is the second section of content.</p>
      </Fold>

      <Fold title="Section Three">
        <p>This is the third section of content.</p>
      </Fold>
    </div>
  );
}`;

const richContentCode = `import { Fold } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: "accessible",
      title: "Fully Accessible",
      description: "Built with React Aria for WCAG 2.1 Level AA compliance.",
      details: [
        "Keyboard navigation (Tab, Enter/Space)",
        "Proper ARIA disclosure pattern",
        "Screen reader friendly",
        "Focus management",
      ],
    },
    // ... more features
  ];

  return (
    <div className="space-y-3">
      {features.map((feature) => (
        <Fold
          key={feature.id}
          title={
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="font-semibold">{feature.title}</div>
                <div className="text-sm text-foreground-400">
                  {feature.description}
                </div>
              </div>
            </div>
          }
          defaultExpanded={selectedFeature === feature.id}
          onExpandedChange={(expanded) =>
            setSelectedFeature(expanded ? feature.id : null)
          }
        >
          <ul className="space-y-2">
            {feature.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span>•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </Fold>
      ))}
    </div>
  );
}`;

export const foldDetail: ComponentDetail = {
  id: "fold",
  name: "Fold",
  description:
    "A disclosure component that expands and collapses content sections with full keyboard support and ARIA compliance.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Fold component provides a lightweight, accessible way to organize
        collapsible content. Built with React Aria, it supports keyboard
        navigation, proper ARIA roles and attributes, and smooth animations.
      </p>
      <p>
        Use Fold components for FAQs, content sections, features lists, and any
        scenario where you need to hide and reveal content on demand. Multiple
        Folds can be used independently or in groups where one is open at a
        time (accordion behavior).
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Fold",
      description: "A simple fold component with a title and content.",
      code: basicFoldCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Click the title to expand or collapse content
          </p>
        </div>
      ),
      renderPreview: BasicFoldPreview,
      controls: foldControls,
    },
    {
      id: "accordion",
      title: "Multiple Folds",
      description:
        "Several folds stacked together forming an accordion-like interface.",
      code: accordionCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Each section expands independently
          </p>
        </div>
      ),
      renderPreview: AccordionPreview,
    },
    {
      id: "rich-content",
      title: "Rich Content",
      description:
        "Folds with complex content including controlled expansion state.",
      code: richContentCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Expand sections to see detailed feature information
          </p>
        </div>
      ),
      renderPreview: RichContentFoldPreview,
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard fold component in collapsed state.",
      code: basicFoldCode,
      preview: (
        <div className="text-sm text-foreground-400">View in examples</div>
      ),
    },
    {
      id: "expanded",
      name: "Expanded",
      description: "Fold component in expanded state showing content.",
      code: `<Fold title="Title" defaultExpanded>
  <p>Content goes here</p>
</Fold>`,
      preview: (
        <div className="text-sm text-foreground-400">View in examples</div>
      ),
    },
  ],
};
