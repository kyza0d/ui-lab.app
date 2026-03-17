import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Starters | UI Lab",
  description: "Browse UI Lab starters",
};

export default function Page() {
  return <ClientPage />;
}
