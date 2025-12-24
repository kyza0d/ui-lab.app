import { Gallery } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-gallery';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-gallery', Component: Example1, metadata: metadata1 },
];

const galleryControls: ControlDef[] = [
  {
    name: 'columns',
    label: 'Columns',
    type: 'select',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ],
    defaultValue: '3',
  },
  {
    name: 'gap',
    label: 'Gap',
    type: 'select',
    options: [
      { label: 'None', value: '0' },
      { label: 'Small', value: '2' },
      { label: 'Medium', value: '4' },
      { label: 'Large', value: '6' },
    ],
    defaultValue: '4',
  },
];

const basicItems = [
  { id: 1, title: 'Mountain Landscape', description: 'Beautiful mountain scenery at sunset', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop', href: '#mountain' },
  { id: 2, title: 'Ocean Waves', description: 'Powerful waves crashing on the shore', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=450&fit=crop', href: '#ocean' },
  { id: 3, title: 'Forest Path', description: 'A peaceful trail through the woods', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop', href: '#forest' },
];

const galleryBasicCode = `import { Gallery } from "ui-lab-components"

const items = [
  { id: 1, title: "Mountain", image: "...", href: "#" },
  { id: 2, title: "Ocean", image: "...", href: "#" },
  { id: 3, title: "Forest", image: "...", href: "#" },
]

export function Example() {
  return (
    <Gallery columns={3}>
      {items.map((item) => (
        <Gallery.Item key={item.id} href={item.href}>
          <Gallery.View aspectRatio="16/9">
            <img src={item.image} alt={item.title} />
          </Gallery.View>
          <Gallery.Body>
            <strong>{item.title}</strong>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  )
}`;

export const galleryDetail: ComponentDetail = {
  id: 'gallery',
  name: 'Gallery',
  description: 'A responsive grid layout component for displaying media content like images, videos, and product cards.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Gallery component provides a flexible grid layout for displaying collections of media content. It supports responsive columns, customizable aspect ratios, and built-in hover/focus interactions.
      </p>
      <p>
        Gallery uses a compound component pattern with Gallery.Item, Gallery.View, and Gallery.Body subcomponents for flexible content composition.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: galleryBasicCode,
      preview: (
        <Gallery columns={3}>
          {basicItems.map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
      controls: galleryControls,
      renderPreview: (props: any) => (
        <Gallery columns={parseInt(props.columns)} gap={parseInt(props.gap)}>
          {basicItems.map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard gallery grid with equal-sized items.',
      code: galleryBasicCode,
      preview: (
        <Gallery columns={3}>
          {basicItems.map((item) => (
            <Gallery.Item key={item.id} href={item.href}>
              <Gallery.View aspectRatio="16/9">
                <img src={item.image} alt={item.title} />
              </Gallery.View>
              <Gallery.Body>
                <strong>{item.title}</strong>
              </Gallery.Body>
            </Gallery.Item>
          ))}
        </Gallery>
      ),
    },
  ],
};

export { galleryControls };
export * from './examples';
