import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Tabs Examples | Dev | UI Lab",
  description: "Dev examples for Tabs component",
};

export default function Page() {
  return <ClientPage />;
}
