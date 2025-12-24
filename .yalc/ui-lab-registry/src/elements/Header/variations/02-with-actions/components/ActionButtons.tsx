import React from 'react';
import { FaUser, FaBell, FaGear } from 'react-icons/fa6';

export function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors" title="Notifications">
        <FaBell className="w-5 h-5" />
      </button>
      <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors" title="Settings">
        <FaGear className="w-5 h-5" />
      </button>
      <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors" title="User Profile">
        <FaUser className="w-5 h-5" />
      </button>
    </div>
  );
}
