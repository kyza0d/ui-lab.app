import { ReactNode } from "react";
import { generateMetadata } from "@/shared";
import { ContentSectionLayout } from "@/features/layout";

export const metadata = generateMetadata({ pathname: '/packages' });

export default function PackagesLayout({
  sidebar,
  content,
}: {
  sidebar: ReactNode;
  content: ReactNode;
}) {
  return <ContentSectionLayout sidebar={sidebar} content={content} minHeight />;
}
