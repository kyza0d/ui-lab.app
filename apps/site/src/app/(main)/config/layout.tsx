import { generateMetadata } from "@/shared";
import type { ReactNode } from "react";

export const metadata = generateMetadata({ pathname: '/config' });

export default function ConfigLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
