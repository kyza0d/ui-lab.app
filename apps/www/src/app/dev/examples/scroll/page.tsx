import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Scroll Examples | Dev | UI Lab",
  description: "Dev examples for Scroll component",
};

export default function Page() {
  return <ClientPage />;
}
