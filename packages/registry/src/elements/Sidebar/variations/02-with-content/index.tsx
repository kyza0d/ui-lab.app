import React from 'react';
import { Sidebar } from './layout/Sidebar';

export function SidebarWithContent() {
  return (
    <div className="flex min-h-screen bg-background-950">
      <Sidebar activeItem="dashboard" />

      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-background-800 border-b border-background-700 px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground-50">Dashboard</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background-800 rounded-lg border border-background-700 p-6">
                    <div className="text-sm text-foreground-400 mb-2">Stat {i}</div>
                    <div className="text-3xl font-bold text-accent-500 mb-2">1,234</div>
                    <div className="text-xs text-foreground-500">+12% from last month</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-background-800 rounded-lg border border-background-700 p-6">
                    <div className="text-sm font-medium text-foreground-50 mb-4">Chart {i}</div>
                    <div className="h-40 bg-background-700 rounded flex items-end justify-between gap-2 p-4">
                      {[60, 75, 50, 90, 65].map((height, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-accent-500 rounded-sm"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-background-800 rounded-lg border border-background-700 p-6">
                <div className="text-sm font-medium text-foreground-50 mb-4">Recent Activity</div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-background-700 rounded">
                      <div className="flex-1">
                        <div className="h-3 bg-background-600 rounded w-1/4 mb-2" />
                        <div className="h-2 bg-background-600 rounded w-1/3" />
                      </div>
                      <div className="h-2 bg-background-600 rounded w-16 ml-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
