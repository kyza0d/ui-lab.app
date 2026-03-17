import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Patterns | UI Lab",
  description: "Browse UI Lab patterns",
};

export default function Page() {
  return <ClientPage />;
}
