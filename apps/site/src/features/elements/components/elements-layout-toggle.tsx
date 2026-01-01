"use client";

import { cn } from '@/shared';
import { useState } from 'react';
import { FaTableCellsLarge, FaList } from 'react-icons/fa6';

export function ElementsLayoutToggle() {
  const [layout, setLayout] = useState('grid'); // Connect to your global state/URL

  return (
    <div className="flex items-center bg-background-900 border border-background-700 p-1 rounded-lg">
      <button
        onClick={() => setLayout('grid')}
        className={cn(
          "p-1.5 rounded-md transition-all",
          layout === 'grid' ? "bg-background-700 text-foreground-50 shadow-sm" : "text-foreground-500 hover:text-foreground-300"
        )}
      >
        <FaTableCellsLarge size={14} />
      </button>
      <button
        onClick={() => setLayout('list')}
        className={cn(
          "p-1.5 rounded-md transition-all",
          layout === 'list' ? "bg-background-700 text-foreground-50 shadow-sm" : "text-foreground-500 hover:text-foreground-300"
        )}
      >
        <FaList size={14} />
      </button>
    </div>
  );
}
