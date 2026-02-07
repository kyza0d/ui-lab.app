"use client";

import { cn } from "@/shared";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Gallery } from "ui-lab-components";

type GalleryColumns = number;
type GalleryGap = number;

const Item = ({ children, title, description, className }: { children?: React.ReactNode; title?: string; description?: string; className?: string }) => (
  <div className={cn("bg-accent-500/10 border border-accent-500/30 rounded px-4 py-3 text-accent-400 text-sm font-medium flex items-center justify-center min-h-16", className)}>
    {title ? (
      <div className="w-full text-center">
        <div className="font-semibold text-foreground-50">{title}</div>
        {description && <div className="text-xs text-foreground-400 mt-1">{description}</div>}
      </div>
    ) : (
      children
    )}
  </div>
);

function InteractivePreview(props: Record<string, any>) {
  const columns = (props.columns || 3) as GalleryColumns;
  const gap = (props.gap || 16) as GalleryGap;
  const items = [
    { title: "Design", description: "Layout systems" },
    { title: "Development", description: "Component API" },
    { title: "Testing", description: "Quality assurance" },
    { title: "Performance", description: "Optimization" },
    { title: "Accessibility", description: "WCAG standards" },
    { title: "Documentation", description: "Usage guides" },
  ];

  return (
    <div className="w-full border border-background-700 rounded-lg p-4 bg-background-900">
      <Gallery columns={columns} gap={gap} className="w-full">
        {items.map((item, i) => (
          <Gallery.Item key={i} aria-label={item.title}>
            <Gallery.View aspectRatio="1/1">
              <Item title={item.title} description={item.description} />
            </Gallery.View>
          </Gallery.Item>
        ))}
      </Gallery>
    </div>
  );
}

function ColumnsPreview() {
  const items = ["Feature", "Layout", "Display"];
  return (
    <div className="space-y-4 w-full">
      <div>
        <p className="text-xs text-foreground-500 mb-2">columns={1}</p>
        <Gallery columns={1} gap={12}>
          {items.map((item, i) => (
            <Gallery.Item key={i} aria-label={item}>
              <Gallery.View aspectRatio="16/9">
                <Item title={item} description="Full width content" />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">columns={2}</p>
        <Gallery columns={2} gap={12}>
          {[...items, ...items].map((item, i) => (
            <Gallery.Item key={i} aria-label={`${item} ${i}`}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item} description={`Item ${i + 1}`} />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">columns={3}</p>
        <Gallery columns={3} gap={12}>
          {[...items, ...items].map((item, i) => (
            <Gallery.Item key={i} aria-label={`${item} ${i}`}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item} description={`Item ${i + 1}`} />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">columns={4}</p>
        <Gallery columns={4} gap={12}>
          {[...Array(8)].map((_, i) => (
            <Gallery.Item key={i} aria-label={`Item ${i + 1}`}>
              <Gallery.View aspectRatio="1/1">
                <Item title={items[i % 3]} description={`Item ${i + 1}`} />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
    </div>
  );
}

function GapPreview() {
  const items = [
    { title: "Compact", description: "Tight spacing" },
    { title: "Default", description: "Standard spacing" },
    { title: "Spacious", description: "Loose spacing" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-foreground-500 mb-2">gap={4}</p>
        <Gallery columns={3} gap={4}>
          {items.map((item, i) => (
            <Gallery.Item key={i} aria-label={item.title}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description={item.description} />
              </Gallery.View>
            </Gallery.Item>
          ))}
          {items.map((item, i) => (
            <Gallery.Item key={`repeat-${i}`} aria-label={`${item.title} 2`}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description={item.description} />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">gap={16}</p>
        <Gallery columns={3} gap={16}>
          {items.map((item, i) => (
            <Gallery.Item key={i} aria-label={item.title}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description={item.description} />
              </Gallery.View>
            </Gallery.Item>
          ))}
          {items.map((item, i) => (
            <Gallery.Item key={`repeat-${i}`} aria-label={`${item.title} 2`}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description={item.description} />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">gap={32}</p>
        <Gallery columns={3} gap={32}>
          {items.map((item, i) => (
            <Gallery.Item key={i} aria-label={item.title}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description={item.description} />
              </Gallery.View>
            </Gallery.Item>
          ))}
          {items.map((item, i) => (
            <Gallery.Item key={`repeat-${i}`} aria-label={`${item.title} 2`}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description={item.description} />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
    </div>
  );
}

function ColumnSpanPreview() {
  return (
    <Gallery columns={3} gap={12}>
      <Gallery.Item columnSpan={2} aria-label="Featured content">
        <Gallery.View aspectRatio="16/9">
          <Item title="Featured" description="Spans 2 columns" />
        </Gallery.View>
      </Gallery.Item>
      <Gallery.Item aria-label="Sidebar item">
        <Gallery.View aspectRatio="1/1">
          <Item title="Sidebar" description="1 column" />
        </Gallery.View>
      </Gallery.Item>
      {["Primary", "Secondary", "Tertiary", "Extra", "Content"].map((title, i) => (
        <Gallery.Item key={i} aria-label={title}>
          <Gallery.View aspectRatio="1/1">
            <Item title={title} description={`Item ${i + 2}`} />
          </Gallery.View>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}

function RowSpanPreview() {
  return (
    <Gallery columns={3} gap={12} rows="3">
      <Gallery.Item rowSpan={2} aria-label="Featured tall item">
        <Gallery.View aspectRatio="1/2">
          <Item title="Featured" description="Spans 2 rows" />
        </Gallery.View>
      </Gallery.Item>
      {["Primary", "Secondary", "Tertiary", "Extra", "More", "Items"].map((title, i) => (
        <Gallery.Item key={i} aria-label={title}>
          <Gallery.View aspectRatio="1/1">
            <Item title={title} description={`Item ${i + 1}`} />
          </Gallery.View>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}

function AspectRatioPreview() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-foreground-500 mb-2">aspectRatio="1/1" (Square)</p>
        <Gallery columns={3} gap={12}>
          {["Product", "Design", "Visual"].map((title, i) => (
            <Gallery.Item key={i} aria-label={title}>
              <Gallery.View aspectRatio="1/1">
                <Item title={title} description="1:1 square" />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">aspectRatio="16/9" (Wide)</p>
        <Gallery columns={2} gap={12}>
          {["Hero", "Banner"].map((title, i) => (
            <Gallery.Item key={i} aria-label={title}>
              <Gallery.View aspectRatio="16/9">
                <Item title={title} description="16:9 wide format" />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">aspectRatio="4/3" (Portrait)</p>
        <Gallery columns={3} gap={12}>
          {["Image", "Video", "Poster"].map((title, i) => (
            <Gallery.Item key={i} aria-label={title}>
              <Gallery.View aspectRatio="4/3">
                <Item title={title} description="4:3 portrait" />
              </Gallery.View>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
    </div>
  );
}

function OrientationPreview() {
  const items = [
    { title: "Stacked", description: "Vertical layout" },
    { title: "Image", description: "Centered" },
    { title: "Card", description: "Content below" },
    { title: "Content", description: "Below image" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-foreground-500 mb-2">orientation="vertical" (Default)</p>
        <Gallery columns={2} gap={12}>
          {items.map((item, i) => (
            <Gallery.Item key={i} orientation="vertical" aria-label={item.title}>
              <Gallery.View aspectRatio="1/1">
                <Item title={item.title} description="View" />
              </Gallery.View>
              <div className="bg-background-800 border-t border-background-700 p-3">
                <p className="font-semibold text-sm text-foreground-50">{item.title}</p>
                <p className="text-xs text-foreground-400">{item.description}</p>
              </div>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2">orientation="horizontal"</p>
        <Gallery columns={1} gap={12}>
          {items.map((item, i) => (
            <Gallery.Item key={i} orientation="horizontal" aria-label={item.title}>
              <Gallery.View aspectRatio="1/1" style={{ width: 100, flexShrink: 0 } as React.CSSProperties}>
                <Item title={item.title.charAt(0)} description="" />
              </Gallery.View>
              <div className="flex-1 bg-background-800 border-l border-background-700 p-3">
                <p className="font-semibold text-sm text-foreground-50">{item.title}</p>
                <p className="text-xs text-foreground-400">{item.description}</p>
              </div>
            </Gallery.Item>
          ))}
        </Gallery>
      </div>
    </div>
  );
}

const galleryControls = [
  { name: "columns", label: "Columns", type: "select" as const, options: [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }], defaultValue: "3" },
  { name: "gap", label: "Gap", type: "select" as const, options: [{ label: "4px", value: "4" }, { label: "12px", value: "12" }, { label: "16px", value: "16" }, { label: "32px", value: "32" }], defaultValue: "16" },
];

const examples: DevExample[] = [
  {
    id: "interactive",
    title: "Interactive Gallery",
    description: "Adjust columns and gap to see how they affect the grid layout.",
    code: `<Gallery columns={3} gap={16}>
  {items.map((item) => (
    <Gallery.Item key={item.id}>
      <Gallery.View aspectRatio="1/1">
        <img src={item.image} alt={item.title} />
      </Gallery.View>
    </Gallery.Item>
  ))}
</Gallery>`,
    preview: <InteractivePreview columns={3} gap={16} />,
    controls: galleryControls,
    renderPreview: InteractivePreview,
    previewLayout: "start",
  },
  {
    id: "columns",
    title: "Columns",
    description: "Control the number of items per row.",
    code: `<Gallery columns={3} gap={12}>
  {items.map((item) => (
    <Gallery.Item key={item.id}>
      <Gallery.View aspectRatio="1/1">...</Gallery.View>
    </Gallery.Item>
  ))}
</Gallery>`,
    preview: <ColumnsPreview />,
    previewLayout: "start",
  },
  {
    id: "gap",
    title: "Gap",
    description: "Spacing between grid items.",
    code: `<Gallery columns={3} gap={16}>...</Gallery>
<Gallery columns={3} gap={32}>...</Gallery>`,
    preview: <GapPreview />,
    previewLayout: "start",
  },
  {
    id: "columnSpan",
    title: "Column Spanning",
    description: "Items can span multiple columns.",
    code: `<Gallery columns={3} gap={12}>
  <Gallery.Item columnSpan={2}>
    <Gallery.View aspectRatio="16/9">...</Gallery.View>
  </Gallery.Item>
  {items.map((item) => (
    <Gallery.Item key={item.id}>...</Gallery.Item>
  ))}
</Gallery>`,
    preview: <ColumnSpanPreview />,
    previewLayout: "start",
  },
  {
    id: "rowSpan",
    title: "Row Spanning",
    description: "Items can span multiple rows.",
    code: `<Gallery columns={3} rows={3} gap={12}>
  <Gallery.Item rowSpan={2}>
    <Gallery.View aspectRatio="1/2">...</Gallery.View>
  </Gallery.Item>
  {items.map((item) => (
    <Gallery.Item key={item.id}>...</Gallery.Item>
  ))}
</Gallery>`,
    preview: <RowSpanPreview />,
    previewLayout: "start",
  },
  {
    id: "aspectRatio",
    title: "Aspect Ratio",
    description: "Control item dimensions with aspect ratios.",
    code: `<Gallery.View aspectRatio="1/1">...</Gallery.View>
<Gallery.View aspectRatio="16/9">...</Gallery.View>
<Gallery.View aspectRatio="4/3">...</Gallery.View>`,
    preview: <AspectRatioPreview />,
    previewLayout: "start",
  },
  {
    id: "orientation",
    title: "Orientation",
    description: "Stack content vertically (default) or horizontally.",
    code: `<Gallery.Item orientation="vertical">
  <Gallery.View>...</Gallery.View>
  <Gallery.Body>...</Gallery.Body>
</Gallery.Item>

<Gallery.Item orientation="horizontal">
  <Gallery.View>...</Gallery.View>
  <Gallery.Body>...</Gallery.Body>
</Gallery.Item>`,
    preview: <OrientationPreview />,
    previewLayout: "start",
  },
];

export default function GalleryExamplesPage() {
  return (
    <DevExampleLayout
      title="Gallery Examples"
      description="Grid layout component for displaying collections of items. Control columns, gaps, spanning, and item orientation."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
