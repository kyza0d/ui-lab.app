import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Popover Examples | Dev | UI Lab",
  description: "Dev examples for Popover component",
};

export default function Page() {
  return <ClientPage />;
}
