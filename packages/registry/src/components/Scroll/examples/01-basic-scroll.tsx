import { Scroll } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Scroll',
  description: 'A simple scrollable container with fixed height. Use this to display overflow content in a constrained space.'
};

export default function Example() {
  return (
    <div className='overflow-hidden' style={{ height: '200px', width: '300px' }}>
      <Scroll>
        <div>
          <p>This is scrollable content.</p>
          <p>Add more content here to see scrolling in action.</p>
          <p>The Scroll component manages overflow elegantly.</p>
          <p>You can scroll through all of this content.</p>
          <p>Perfect for constrained layouts.</p>
        </div>
      </Scroll>
    </div>
  );
}
