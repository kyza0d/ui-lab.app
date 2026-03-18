import { DocsLayout } from "@/features/docs";
import { generateMetadata } from "@/shared";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({ pathname: '/docs' });

export default async function Layout({ children }: { children: React.ReactNode }) {
  'use cache'

  return (
    <DocsLayout
      banner={
        <div className="hidden h-90 border-b border-background-700/40 bg-background-800 w-full text-sm font-medium">
        </div>
      }
    >
      {children}
    </DocsLayout>
  );
}
