'use client';

import React from 'react';
import { List } from 'ui-lab-components';
import styles from './list-examples.module.css';

const EXAMPLE_ITEMS = [
  { id: '1', title: 'Alice Johnson', desc: 'alice@example.com', avatar: '👩' },
  { id: '2', title: 'Bob Smith', desc: 'bob@example.com', avatar: '👨' },
  { id: '3', title: 'Carol White', desc: 'carol@example.com', avatar: '👩‍🦰' },
  { id: '4', title: 'David Brown', desc: 'david@example.com', avatar: '🧔' },
];

export default function ListExamplesPage() {
  const listRef1 = React.useRef<any>(null);
  const listRef2 = React.useRef<any>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [highlightIndex, setHighlightIndex] = React.useState<number | null>(null);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>List Compound Component</h1>

        {/* Example 1: Basic List with Keyboard Navigation */}
        <section className={styles.section}>
          <h2>Basic List with Keyboard Navigation</h2>
          <p>Use the buttons to navigate items with keyboard events:</p>

          <List
            ref={listRef1}
            items={EXAMPLE_ITEMS}
            variant="default"
            spacing="default"
            onNavigate={{
              down: () => console.log('Down pressed'),
              up: () => console.log('Up pressed'),
              enter: () => {
                const idx = listRef1.current?.getHighlightedIndex?.();
                if (idx !== null && idx !== undefined) {
                  setSelectedId(EXAMPLE_ITEMS[idx]?.id || null);
                  console.log('Selected:', EXAMPLE_ITEMS[idx]?.title);
                }
              },
            }}
          >
            <List.Header sticky>
              <span>People</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--foreground-400)' }}>
                {EXAMPLE_ITEMS.length} items
              </span>
            </List.Header>

            {EXAMPLE_ITEMS.map((item) => (
              <List.Item
                key={item.id}
                value={item.id}
                onClick={() => setSelectedId(item.id)}
              >
                <List.Media>
                  <span style={{ fontSize: '1.5rem' }}>{item.avatar}</span>
                </List.Media>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500 }}>{item.title}</div>
                  <List.Desc>{item.desc}</List.Desc>
                </div>
                <List.Checkbox checked={selectedId === item.id} />
              </List.Item>
            ))}

            <List.Footer align="center">
              <button onClick={() => listRef1.current?.focusFirst?.()}>
                ⬆ First
              </button>
              <button onClick={() => listRef1.current?.focusPrev?.()}>
                ▲ Prev
              </button>
              <button onClick={() => listRef1.current?.focusNext?.()}>
                ▼ Next
              </button>
              <button onClick={() => listRef1.current?.focusLast?.()}>
                ⬇ Last
              </button>
              <button onClick={() => listRef1.current?.selectHighlighted?.()}>
                ✓ Select
              </button>
            </List.Footer>
          </List>

          <div className={styles.infoBox}>
            {selectedId && (
              <p>Selected: <strong>{EXAMPLE_ITEMS.find(i => i.id === selectedId)?.title}</strong></p>
            )}
            {!selectedId && <p>No item selected yet</p>}
          </div>
        </section>

        {/* Example 2: Multi-Selection List */}
        <section className={styles.section}>
          <h2>Multi-Selection Pattern</h2>
          <p>Compound List enables flexible selection patterns:</p>

          <List
            ref={listRef2}
            items={EXAMPLE_ITEMS}
            variant="default"
            spacing="sm"
          >
            <List.Header>
              <span>Select Multiple</span>
            </List.Header>

            {EXAMPLE_ITEMS.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <List.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => setSelectedId(isSelected ? null : item.id)}
                >
                  <List.Checkbox checked={isSelected} />
                  <List.Media>
                    <span style={{ fontSize: '1rem' }}>{item.avatar}</span>
                  </List.Media>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.title}</div>
                  </div>
                </List.Item>
              );
            })}
          </List>
        </section>

        {/* Documentation */}
        <section className={styles.section}>
          <h2>Component API</h2>
          <div className={styles.docs}>
            <div>
              <h3>List (Root)</h3>
              <ul>
                <li><code>items</code>: Array for keyboard nav reference</li>
                <li><code>onNavigate</code>: Keyboard callbacks (up, down, enter, escape)</li>
                <li><code>ref</code>: ListRef with methods (focusNext, focusPrev, etc.)</li>
              </ul>
            </div>

            <div>
              <h3>List.Item</h3>
              <ul>
                <li><code>value</code>: Unique identifier for the item</li>
                <li><code>data-highlighted</code>: Set when keyboard focused</li>
              </ul>
            </div>

            <div>
              <h3>Sub-Components</h3>
              <ul>
                <li><code>List.Header</code>: Optional sticky header</li>
                <li><code>List.Checkbox</code>: Selection indicator slot</li>
                <li><code>List.Media</code>: Icon/avatar slot (w:2rem, h:2rem)</li>
                <li><code>List.Desc</code>: Secondary text with muted color</li>
                <li><code>List.Footer</code>: Optional footer section</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
