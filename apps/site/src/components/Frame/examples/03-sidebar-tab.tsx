export const metadata = {
  title: 'Sidebar Tab Frame',
  description: 'A frame with a tab extending from the side, perfect for active navigation states.'
};

import Frame from '../Frame';

const TAB_WIDTH = 120;
const TAB_PATH = "M 0 0 C 20 0 20 -24 40 -24 L 80 -24 C 100 -24 100 0 120 0";

const Example3 = () => {
  return (
    <div className="flex flex-row gap-0 p-12 items-center justify-center bg-zinc-950 min-h-[400px]">
      {/* Mock Sidebar */}
      <div className="flex flex-col items-end justify-center space-y-8 pr-6 border-r border-zinc-800/50 h-64">
        <div className="text-zinc-600 font-medium cursor-pointer hover:text-zinc-400 transition-colors">Dashboard</div>
        <div className="text-emerald-400 font-bold cursor-default">Settings</div>
        <div className="text-zinc-600 font-medium cursor-pointer hover:text-zinc-400 transition-colors">Profile</div>
      </div>

      {/* Frame content - visually connecting to "Settings" */}
      <div className="-ml-[1.5px]"> {/* Overlap border slightly to merge visual connection */}
        <Frame
          side="left"
          shapeMode="extend"
          path={TAB_PATH}
          pathWidth={TAB_WIDTH}
          fill="#18181b80"
          className="w-80 h-64 backdrop-blur-sm"
          padding="large"
          cornerRadius={16}
        >
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <div className="space-y-3">
              <div className="h-2 w-2/3 bg-zinc-800 rounded"></div>
              <div className="h-2 w-1/2 bg-zinc-800 rounded"></div>
              <div className="h-2 w-3/4 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  );
};

export default Example3;
