import { Gallery } from 'ui-lab-components';

export const metadata = {
  title: 'Spanning Grid Layout',
  description: 'A mosaic grid layout with items spanning multiple columns and rows.'
};

const items = [
  { id: 1, colSpan: 2, rowSpan: 2, color: '#e0e0e0', title: 'Main Feature' },
  { id: 2, colSpan: 1, rowSpan: 1, color: '#d0d0d0', title: 'Item 2' },
  { id: 3, colSpan: 1, rowSpan: 1, color: '#c0c0c0', title: 'Item 3' },
  { id: 4, colSpan: 1, rowSpan: 2, color: '#b0b0b0', title: 'Tall Item' },
  { id: 5, colSpan: 2, rowSpan: 1, color: '#a0a0a0', title: 'Wide Item' },
  { id: 6, colSpan: 1, rowSpan: 1, color: '#909090', title: 'Item 6' },
];

export default function Example() {
  return (
    <Gallery columns={4} gap="md" style={{ gridAutoRows: '200px' }}>
      {items.map((item) => (
        <Gallery.Item
          key={item.id}
          columnSpan={item.colSpan}
          rowSpan={item.rowSpan}
        >
          <div
            style={{
              backgroundColor: item.color,
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#333',
              fontWeight: 'bold'
            }}
          >
            {item.title}
          </div>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}
