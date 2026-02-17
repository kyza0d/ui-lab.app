'use client';

import React from 'react';
import { List } from './index';

export function ListCompoundTest() {
  const listRef = React.useRef<any>(null);
  const items = [
    { id: '1', title: 'Item 1', desc: 'First item' },
    { id: '2', title: 'Item 2', desc: 'Second item' },
    { id: '3', title: 'Item 3', desc: 'Third item' },
  ];

  const handleNavigate = () => {
    console.log('Navigate down');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>List Compound Component Test</h2>

      <List
        ref={listRef}
        items={items}
        variant="default"
        spacing="default"
        onNavigate={{
          down: handleNavigate,
          up: () => console.log('Navigate up'),
          enter: () => console.log('Enter pressed'),
        }}
      >
        <List.Header>
          <span>Items</span>
        </List.Header>

        {items.map((item) => (
          <List.Item key={item.id} value={item.id}>
            <List.Media>
              <div style={{ width: '24px', height: '24px', background: '#ccc', borderRadius: '4px' }} />
            </List.Media>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{item.title}</div>
              <List.Desc>{item.desc}</List.Desc>
            </div>
            <List.Checkbox checked={false} />
          </List.Item>
        ))}

        <List.Footer>
          <button onClick={() => listRef.current?.focusNext()}>Next</button>
          <button onClick={() => listRef.current?.focusPrev()}>Prev</button>
          <button onClick={() => listRef.current?.focusFirst()}>First</button>
          <button onClick={() => listRef.current?.focusLast()}>Last</button>
        </List.Footer>
      </List>

      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#666' }}>
        <p>Try the buttons to test keyboard navigation:</p>
        <ul>
          <li>Next / Prev moves highlight up/down</li>
          <li>First / Last jumps to endpoints</li>
          <li>Hover items to highlight them</li>
        </ul>
      </div>
    </div>
  );
}

export default ListCompoundTest;
