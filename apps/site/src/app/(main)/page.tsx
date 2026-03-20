import { Toaster } from "ui-lab-components";
import { HeroSection, Showcase, NodeSection } from "@/features/landing";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { LandingSidebar } from "@/features/landing/components/landing-sidebar";
import { Footer } from "@/features/layout";
import { Metadata } from "next";
import { generateMetadata as buildMetadata } from "@/shared/lib/metadata";

export const metadata: Metadata = buildMetadata({
  pathname: "/",
});

export default function Home() {
  return (
    <>
      <div className="w-full pt-16 flex flex-col md:flex-row">
        <Toaster />
        <LandingSidebar />
        <main className="flex-1 h-full border-r border-background-700/40 w-full flex flex-col items-center md:overflow-x-hidden">

          <section className="w-full border-t-0 relative isolate after:content-[''] bg-background-950 ml-auto">
            <div className="grid mt-[-2px] grid-cols-[1fr] grid-rows-[424px]">
              <HeroSection />
            </div>
          </section>
          <div className="w-full relative px-4 border-t border-background-700/40">
            <div className="hidden bg-background-500">
              <div
                className="z-99 pointer-events-none absolute inset-x-0 bottom-50 h-200"
                style={{ boxShadow: "inset 0 -100px 100px 20px var(--color-background-950)" }}
              >
              </div>
              <div
                className="z-99 bg-background-950 pointer-events-none absolute inset-x-0 bottom-0 h-50"
              >
              </div>
            </div>
            <div className="py-6">
              <Showcase />
            </div>

            <div className="hidden">
              <NodeSection>
                <FeaturesSection />
              </NodeSection>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </>
  );
}
