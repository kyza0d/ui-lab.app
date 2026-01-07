export const metadata = {
  title: 'Tooltip Frame',
  description: 'A frame with a pointer tail on the bottom, typical for tooltips or popovers.'
};

import { Frame } from 'ui-lab-components';

const TAIL_WIDTH = 48;
const TAIL_PATH = "M 0 0 C 8 0 20 -16 24 -16 C 28 -16 36 0 48 0";

const Example2 = () => {
  return (
    <div className="flex flex-col gap-12 p-12 items-center justify-center min-h-[400px] bg-background-950">
      <Frame
        side="bottom"
        shapeMode="extend"
        path={TAIL_PATH}
        pathWidth={TAIL_WIDTH}
        fill="var(--color-background-900)"
        // style={{ color: "var(--background-700)" }}
        className="max-w-sm border-background-700"
        padding="large"
      >
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2 text-foreground-50">Did you know?</h3>
          <p className="text-foreground-400 text-sm leading-relaxed">
            You can customize the frame orientation using the <code className="bg-background-800 px-1 rounded">side</code> prop.
            This frame uses <code className="text-accent-500">side="bottom"</code> to create a tooltip tail.
          </p>
        </div>
      </Frame>
    </div>
  );
};

export default Example2;
