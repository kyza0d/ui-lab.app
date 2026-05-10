import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Textarea Examples | Dev | UI Lab",
  description: "Dev examples for Textarea component",
};

export default function Page() {
  return <ClientPage />;
}
