import React from 'react';

export function createSectionSkeleton(sectionId: string): React.ReactNode {
  switch (sectionId) {
    case 'hero':
      return createHeroSkeleton();
    case 'cta':
      return createCTASkeleton();
    case 'features':
      return createFeaturesSkeleton();
    case 'testimonials':
      return createTestimonialsSkeleton();
    case 'pricing':
      return createPricingSkeleton();
    default:
      return null;
  }
}

function createHeroSkeleton(): React.ReactNode {
  return React.createElement(
    'div',
    {
      style: { width: '85%' },
      className: 'rounded-sm overflow-hidden border border-background-700 flex flex-col gap-4 max-w-lg',
    },
    // Title area
    React.createElement('div', { className: 'pt-4 px-4' },
      React.createElement('div', {
        style: { width: '80%', backgroundColor: 'var(--background-500)', opacity: 0.3 },
        className: 'rounded-md h-4 mb-3',
      }),
      React.createElement('div', {
        style: { width: '60%', backgroundColor: 'var(--background-500)', opacity: 0.2 },
        className: 'rounded-md h-2',
      })
    ),
    // Subtitle area
    React.createElement('div', { className: 'px-4' },
      React.createElement('div', {
        style: { width: '90%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
        className: 'rounded-md h-1.5 mb-2',
      }),
      React.createElement('div', {
        style: { width: '75%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
        className: 'rounded-md h-1.5',
      })
    ),
    // CTA buttons area
    React.createElement('div', { className: 'px-4 pb-4 flex gap-2' },
      React.createElement('div', {
        style: { width: '100px', backgroundColor: 'var(--accent-500)', opacity: 0.3 },
        className: 'rounded-md h-3',
      }),
      React.createElement('div', {
        style: { width: '100px', backgroundColor: 'var(--background-500)', opacity: 0.2 },
        className: 'rounded-md h-3',
      })
    )
  );
}

function createCTASkeleton(): React.ReactNode {
  return React.createElement(
    'div',
    {
      style: { width: '80%' },
      className: 'rounded-sm overflow-hidden border border-background-700 flex flex-col gap-3 max-w-sm',
    },
    // Header area
    React.createElement('div', { className: 'border-b border-background-700 p-2' }),
    // Content area with headline
    React.createElement('div', { className: 'px-3 py-2' },
      React.createElement('div', {
        style: { width: '75%', backgroundColor: 'var(--background-500)', opacity: 0.3 },
        className: 'rounded-md h-3 mb-2',
      }),
      React.createElement('div', {
        style: { width: '90%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
        className: 'rounded-md h-1.5 mb-2',
      }),
      React.createElement('div', {
        style: { width: '65%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
        className: 'rounded-md h-1.5',
      })
    ),
    // Button area
    React.createElement('div', { className: 'px-3 pb-3 flex gap-2' },
      React.createElement('div', {
        style: { width: '90px', backgroundColor: 'var(--accent-500)', opacity: 0.3 },
        className: 'rounded-md h-3',
      })
    )
  );
}

function createFeaturesSkeleton(): React.ReactNode {
  return React.createElement(
    'div',
    {
      style: { width: '85%' },
      className: 'rounded-sm overflow-hidden border border-background-700 flex flex-col gap-3 max-w-lg',
    },
    // Title area
    React.createElement('div', { className: 'border-b border-background-700 p-2' }),
    // Grid of features (3 columns)
    React.createElement('div', { className: 'px-3 py-2' },
      React.createElement('div', { className: 'grid grid-cols-3 gap-2' },
        // Feature 1
        React.createElement('div', { key: '1' },
          React.createElement('div', {
            style: { backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-6 mb-1.5',
          }),
          React.createElement('div', {
            style: { width: '80%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1',
          })
        ),
        // Feature 2
        React.createElement('div', { key: '2' },
          React.createElement('div', {
            style: { backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-6 mb-1.5',
          }),
          React.createElement('div', {
            style: { width: '70%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1',
          })
        ),
        // Feature 3
        React.createElement('div', { key: '3' },
          React.createElement('div', {
            style: { backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-6 mb-1.5',
          }),
          React.createElement('div', {
            style: { width: '75%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1',
          })
        )
      )
    )
  );
}

function createTestimonialsSkeleton(): React.ReactNode {
  return React.createElement(
    'div',
    {
      style: { width: '85%' },
      className: 'rounded-sm overflow-hidden border border-background-700 flex flex-col gap-3 max-w-lg',
    },
    // Header area
    React.createElement('div', { className: 'border-b border-background-700 p-2' }),
    // Three testimonial cards
    React.createElement('div', { className: 'px-3 py-2' },
      React.createElement('div', { className: 'grid grid-cols-3 gap-2' },
        // Card 1
        React.createElement('div', { key: '1', className: 'border border-background-700 rounded-md p-2 flex flex-col gap-1.5' },
          React.createElement('div', {
            style: { backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1 flex-grow',
          }),
          React.createElement('div', {
            style: { width: '60%', backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-0.5 mt-auto',
          })
        ),
        // Card 2
        React.createElement('div', { key: '2', className: 'border border-background-700 rounded-md p-2 flex flex-col gap-1.5' },
          React.createElement('div', {
            style: { backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1 flex-grow',
          }),
          React.createElement('div', {
            style: { width: '70%', backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-0.5 mt-auto',
          })
        ),
        // Card 3
        React.createElement('div', { key: '3', className: 'border border-background-700 rounded-md p-2 flex flex-col gap-1.5' },
          React.createElement('div', {
            style: { backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1 flex-grow',
          }),
          React.createElement('div', {
            style: { width: '65%', backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-0.5 mt-auto',
          })
        )
      )
    )
  );
}

function createPricingSkeleton(): React.ReactNode {
  return React.createElement(
    'div',
    {
      style: { width: '90%' },
      className: 'rounded-sm overflow-hidden border border-background-700 flex flex-col gap-3 max-w-lg',
    },
    // Header area
    React.createElement('div', { className: 'border-b border-background-700 p-2' }),
    // Three pricing cards
    React.createElement('div', { className: 'px-3 py-2' },
      React.createElement('div', { className: 'grid grid-cols-3 gap-2' },
        // Card 1
        React.createElement('div', { key: '1', className: 'border border-background-700 rounded-md p-2 flex flex-col gap-1.5' },
          React.createElement('div', {
            style: { width: '70%', backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-1.5 mb-1',
          }),
          React.createElement('div', {
            style: { width: '50%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1',
          }),
          React.createElement('div', {
            style: { width: '60%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1 mt-1',
          }),
          React.createElement('div', {
            style: { backgroundColor: 'var(--accent-500)', opacity: 0.25 },
            className: 'rounded-md h-2 mt-2',
          })
        ),
        // Card 2 (highlighted)
        React.createElement('div', { key: '2', className: 'border border-accent-500 rounded-md p-2 flex flex-col gap-1.5' },
          React.createElement('div', {
            style: { width: '70%', backgroundColor: 'var(--background-500)', opacity: 0.25 },
            className: 'rounded-md h-1.5 mb-1',
          }),
          React.createElement('div', {
            style: { width: '55%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1',
          }),
          React.createElement('div', {
            style: { width: '65%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1 mt-1',
          }),
          React.createElement('div', {
            style: { backgroundColor: 'var(--accent-500)', opacity: 0.35 },
            className: 'rounded-md h-2 mt-2',
          })
        ),
        // Card 3
        React.createElement('div', { key: '3', className: 'border border-background-700 rounded-md p-2 flex flex-col gap-1.5' },
          React.createElement('div', {
            style: { width: '70%', backgroundColor: 'var(--background-500)', opacity: 0.2 },
            className: 'rounded-md h-1.5 mb-1',
          }),
          React.createElement('div', {
            style: { width: '50%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1',
          }),
          React.createElement('div', {
            style: { width: '60%', backgroundColor: 'var(--background-500)', opacity: 0.15 },
            className: 'rounded-md h-1 mt-1',
          }),
          React.createElement('div', {
            style: { backgroundColor: 'var(--accent-500)', opacity: 0.25 },
            className: 'rounded-md h-2 mt-2',
          })
        )
      )
    )
  );
}
