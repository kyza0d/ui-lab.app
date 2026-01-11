export const metadata = {
  title: 'Featured Card Frame',
  description: 'A card frame with a curved top cutout for featured images or hero content.'
};

import { Frame } from 'ui-lab-components';

// The SVG path definition for the curve
const LIQUID_WIDTH = 180;
const LIQUID_PATH = "M 0 0 C 36 0 36 44 90 44 C 144 44 144 0 180 0";

const DefaultFrame = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-background-950">
      <div className="relative w-full max-w-sm group">

        {/* 1. The Frame Component with the Path Prop */}
        <Frame
          path={LIQUID_PATH}
          pathWidth={LIQUID_WIDTH}
          className="text-background-700  bg-background-700/20 shadow-2xl backdrop-blur-sm"
          style={{ color: "var(--background-700)" }}
        >
          {/* Minimal Content */}
          <div className="w-100 h-50 flex flex-col h-full p-17 text-center">
          </div>
        </Frame>
      </div>
    </div>
  );
};

export default DefaultFrame;
