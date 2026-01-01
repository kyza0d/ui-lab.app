import React from 'react';
import Frame from '../Frame';

export const metadata = {
  title: 'Featured Card Frame',
  description: 'A card frame with a curved top cutout for featured images or hero content.'
};

const curvedTopCutoutPath = (width: number, height: number) => {
  const w = width;
  const h = height;
  const radius = 16;
  const cutoutRadius = 60;
  const cutoutCenterX = w / 2;
  const cutoutCenterY = -cutoutRadius + 24;

  return `M ${radius},0
    L ${w - radius},0
    Q ${w},0 ${w},${radius}
    L ${w},${h - radius}
    Q ${w},${h} ${w - radius},${h}
    L ${radius},${h}
    Q 0,${h} 0,${h - radius}
    L 0,${radius}
    Q 0,0 ${radius},0
    M ${cutoutCenterX - cutoutRadius},${cutoutCenterY}
    A ${cutoutRadius},${cutoutRadius} 0 0,1 ${cutoutCenterX + cutoutRadius},${cutoutCenterY}
    A ${cutoutRadius},${cutoutRadius} 0 0,0 ${cutoutCenterX - cutoutRadius},${cutoutCenterY}`;
};

export default function Example() {
  return (
    <Frame
      variant="default"
      padding="none"
      pathBuilder={curvedTopCutoutPath}
      className="w-full max-w-sm overflow-hidden"
    >
      <div className="pt-20 px-4 pb-6 space-y-4">
        <div className="h-32 -mx-4 -mt-20 bg-gradient-to-b from-accent-400 to-accent-500 rounded-full flex items-center justify-center text-4xl">
          📊
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Analytics Report</h3>
          <p className="text-sm text-foreground-300 mt-1">Track your metrics with interactive dashboards and real-time insights.</p>
        </div>
        <button className="w-full px-3 py-2 rounded bg-accent-500 text-white text-sm font-medium">
          View Report
        </button>
      </div>
    </Frame>
  );
}
