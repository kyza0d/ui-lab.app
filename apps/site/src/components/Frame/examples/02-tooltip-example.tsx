export const metadata = {
  title: 'Tooltip Frame',
  description: 'A frame with a pointer tail on the bottom, typical for tooltips or popovers.'
};

import Frame from '../Frame';

const TAIL_WIDTH = 48;
const TAIL_PATH = "M 0 0 C 8 0 20 -16 24 -16 C 28 -16 36 0 48 0";

const Example2 = () => {
  return (
    <div className="flex flex-col gap-12 p-12 items-center justify-center min-h-[400px]">
      <Frame
        side="bottom"
        shapeMode="extend"
        path={TAIL_PATH}
        pathWidth={TAIL_WIDTH}
        fill="#18181b" // zinc-900
        className="text-zinc-100 max-w-sm"
        padding="large"
      >
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2 text-white">Did you know?</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            You can customize the frame orientation using the <code className="bg-zinc-800 px-1 rounded">side</code> prop.
            This frame uses <code className="text-emerald-400">side="bottom"</code> to create a tooltip tail.
          </p>
        </div>
      </Frame>
    </div>
  );
};

export default Example2;
