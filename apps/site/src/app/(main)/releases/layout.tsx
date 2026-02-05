"use client";

import { LandingSidebar } from "@/shared/components/landing-sidebar";
import { Footer } from "@/features/layout";

export default function ReleasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full pt-16 flex flex-col md:flex-row">
      <LandingSidebar />
      <div className="flex-1 flex flex-col mt-(--header-height)">
        <div className="flex items-center">
          <div className="pt-12 mx-auto max-w-3xl w-full px-6 pb-12">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
