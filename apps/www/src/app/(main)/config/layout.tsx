import { generateMetadata } from "@/shared";
import type { ReactNode } from "react";

export const metadata = generateMetadata({ pathname: '/config' });

export default function ConfigLayout({ children }: { children: ReactNode }) {
  return (
    <div className="config-route-shell w-full min-h-[calc(100vh-var(--header-height))] pt-(--header-height)">
      {children}
    </div>
  );
}
