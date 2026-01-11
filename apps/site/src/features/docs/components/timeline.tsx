'use client';
import React, { useMemo, ReactElement, ReactNode } from 'react';

interface TimelineStep {
  number: number | null;
  header: ReactElement;
  content: ReactNode[];
}

export default function Timeline({ children }: { children: ReactNode }) {
  const steps = useMemo(() => {
    const childArray = React.Children.toArray(children);
    const timelineSteps: TimelineStep[] = [];
    let currentStep: TimelineStep | null = null;

    childArray.forEach((child) => {
      if (
        React.isValidElement(child) &&
        child.type === 'h2'
      ) {
        if (currentStep) {
          timelineSteps.push(currentStep);
        }
        const headerText = extractText(child);
        const numberMatch = headerText.match(/^(\d+)/);
        const number = numberMatch ? parseInt(numberMatch[1], 10) : null;
        currentStep = {
          number,
          header: child,
          content: [],
        };
      } else if (currentStep) {
        currentStep.content.push(child);
      }
    });

    if (currentStep) {
      timelineSteps.push(currentStep);
    }
    return timelineSteps;
  }, [children]);

  const circleSize = 26;
  const halfCircle = circleSize / 2;

  return (
    <div className="space-y-12">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        // Clone the header (h2) and add mt-0 to remove top margin
        const headerElement = step.header as React.ReactElement<{ className?: string }>;
        const styledHeader = React.cloneElement(headerElement, {
          className: `mt-0.5! ${headerElement.props.className || ''}`.trim(),
        });

        return (
          <div key={index} className="mt-10 relative flex items-start">
            {/* Circle marker */}
            <div
              className="absolute left-0 flex pr-px items-center justify-center rounded-lg border border-background-600 bg-background-700 text-xs font-bold text-foreground-200 z-10"
              style={{
                width: `${circleSize}px`,
                height: `${circleSize}px`,
              }}
            >
              {step.number ?? index + 1}
            </div>

            {!isLast && (
              <div
                className="absolute border-l origin-center -scale-y-90 w-0.5 border-background-700 z-0 -translate-x-1/2"
                style={{
                  left: `${halfCircle}px`,
                  top: `${halfCircle + 19}px`,
                  height: "100%",
                }}
              />
            )}

            {/* Content (header + body) */}
            <div className="ml-8 pl-4 min-w-0 flex-1">
              <div className="space-y-4">
                {styledHeader}
                {step.content.length > 0 && (
                  <div className="space-y-4">
                    {step.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function extractText(element: ReactElement): string {
  const props = element.props as { children?: ReactNode };
  if (typeof props.children === 'string') {
    return props.children;
  }
  if (Array.isArray(props.children)) {
    return props.children
      .map((child: ReactNode) =>
        typeof child === 'string'
          ? child
          : React.isValidElement(child)
            ? extractText(child)
            : ''
      )
      .join('');
  }
  if (React.isValidElement(props.children)) {
    return extractText(props.children);
  }
  return '';
}
