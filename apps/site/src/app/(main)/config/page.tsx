import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Config | UI Lab",
  description: "Configure your UI Lab theme",
};

export default function Page() {
  return <ClientPage />;
}
