import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Color | Dev | UI Lab",
  description: "Dev color picker",
};

export default function Page() {
  return <ClientPage />;
}
