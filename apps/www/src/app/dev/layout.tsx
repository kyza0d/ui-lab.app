import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev | UI Lab",
  description: "Development environment for UI Lab components",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
