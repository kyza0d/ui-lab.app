import { Gallery } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Gallery',
  description: 'A simple gallery with multiple items in a grid layout. Use this for displaying collections of images or content.'
};

export default function Example() {
  return (
    <Gallery columns={3} gap="md">
      <Gallery.Item>
        <Gallery.View aspectRatio="1/1">
          <div style={{ background: '#e0e0e0', width: '100%', height: '100%' }} />
        </Gallery.View>
      </Gallery.Item>
      <Gallery.Item>
        <Gallery.View aspectRatio="1/1">
          <div style={{ background: '#d0d0d0', width: '100%', height: '100%' }} />
        </Gallery.View>
      </Gallery.Item>
      <Gallery.Item>
        <Gallery.View aspectRatio="1/1">
          <div style={{ background: '#c0c0c0', width: '100%', height: '100%' }} />
        </Gallery.View>
      </Gallery.Item>
    </Gallery>
  );
}
