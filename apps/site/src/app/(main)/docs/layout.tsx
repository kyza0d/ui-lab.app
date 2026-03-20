import { DocsLayout } from "@/features/docs";
import { YouTubeBanner } from "@/features/docs/components/youtube-banner";
import { generateMetadata } from "@/shared";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata({ pathname: '/docs' });

export default async function Layout({ children }: { children: React.ReactNode }) {
  'use cache'

  return (
    <DocsLayout
    // Disabled for now
    // banner={<YouTubeBanner videoId="VSYQLmGf3To" title="UI Lab YouTube video" />}
    >
      {children}
    </DocsLayout>
  );
}
