"use client";

import Link from "next/link";
import { Logo } from "@/shared";

export function Footer() {
  return (
    <footer className="py-12 px-8 relative bg-background-950 border-t border-background-700 overflow-hidden">
      <div className="absolute inset-0 bg-background-950/80 -z-10" />

      <div className="relative flex z-10 px-2">
        <div className="mb-8 flex items-center gap-3">
          <Logo />
          <span className="text-md font-semibold text-foreground-300">UI Lab</span>
        </div>
        <div className="grid grid-cols-3 w-fit max-w-3xl ml-auto gap-24">
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
      </div>
    </footer>
  );
}
