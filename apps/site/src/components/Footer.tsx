"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-x max-w-[1400px] mx-auto border-t border-background-700 pb-10 pt-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="hidden absolute inset-0 w-full h-full object-cover -z-10"
        src="/nature.mp4"
      />
      <div className="absolute inset-0 bg-background-950/80 -z-10" />
      <div className="relative z-10 px-2">
        <div className="grid grid-cols-3 w-fit max-w-3xl ml-auto gap-24 mb-14">
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground-50">Components</p>
            <ul className="space-y-2">
              <li>
                <Link href="/components" className="text-sm text-foreground-400 hover:text-foreground-300">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/components" className="text-sm text-foreground-400 hover:text-foreground-300">
                  All Components
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground-50">Docs</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground-400 hover:text-foreground-300">
                  Installation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground-400 hover:text-foreground-300">
                  Theming
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground-50">Links</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground-400 hover:text-foreground-300">
                  Github
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground-400 hover:text-foreground-300">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background-700 pt-6 px-4 flex items-center justify-between">
          <p className="text-sm text-foreground-500">
            © 2024 UI Lab. all rights reserved.
          </p>
          <p className="text-sm text-foreground-500">
            Built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
