import { Gallery } from 'ui-lab-components';

export const metadata = {
  title: 'Masonry Layout',
  description: 'A masonry layout that packs items efficiently based on their height. Ideal for mixed aspect ratio content.'
};

const items = [
  { id: 1, height: 300, color: '#e0e0e0' },
  { id: 2, height: 400, color: '#d0d0d0' },
  { id: 3, height: 250, color: '#c0c0c0' },
  { id: 4, height: 350, color: '#b0b0b0' },
  { id: 5, height: 200, color: '#a0a0a0' },
  { id: 6, height: 450, color: '#909090' },
];

export default function Example() {
  return (
    <Gallery layout="masonry" columns={3} gap="md">
      {items.map((item) => (
        <Gallery.Item key={item.id}>
           <div style={{
              backgroundColor: item.color,
              height: item.height,
              width: '100%',
              borderRadius: 8
            }} />
        </Gallery.Item>
      ))}
    </Gallery>
  );
}
