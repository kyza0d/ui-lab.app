"use client"

import Link from "next/link";
import { Badge } from "ui-lab-components";
import {
  SiReact,
  SiTailwindcss,
  SiGreensock
} from "react-icons/si";
import { Toaster } from "ui-lab-components";
import { Button } from "ui-lab-components";

export default function Home() {
  return (
    <>
      <Toaster />
      <main>
        <article>
          <section className="flex justify-center items-center h-screen max-h-240">
            <div>
              <div className="flex flex-wrap gap-3 mb-12 hidden">
                <Badge
                  size="sm"
                  color="#61DAFB"
                  className="pr-3"
                  icon={<div className="bg-[#61DAFB]/30 text-[#61DAFB] rounded-md p-2">
                    <SiReact
                      className="w-4 h-4"
                    />
                  </div>}
                >
                  Built with React
                </Badge>

                <Badge
                  size="sm"
                  color="#06B6D4"
                  className="pr-3"
                  icon={
                    <div className="bg-[#06B6D4]/30 text-[#06B6D4] rounded-md p-2">
                      <SiTailwindcss className="w-4 h-4" />
                    </div>
                  }
                >
                  Styled with Tailwind CSS
                </Badge>

                <Badge
                  size="sm"
                  className="pr-3"
                  color="#00D084"
                  icon={
                    <div className="bg-[#00D084]/30 text-[#00D084] rounded-md p-2">
                      <SiGreensock className="w-4 h-4" />
                    </div>
                  }
                >
                  Animated with GSAP
                </Badge>
              </div>

              <Button className="destructive">Hello</Button>
              <h1 className="mb-4 text-foreground-50">The Most Expressive <br />UI Library For Modern Web</h1>
              <p className="mb-8">A modern, beautifully crafted component library — pixel-perfect, <br /> fully accessible, and developer-friendly out of the box.</p>
              <div className="flex gap-4">
                <Link href="/components">
                  <Button size="md">Get Started</Button>
                </Link>
                <Link href="/components">
                  <Button size="md" variant="outline">View Components</Button>
                </Link>
              </div>

            </div>
          </section>
        </article>
      </main>
    </>
  );
}
