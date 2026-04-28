import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Gallery Examples | Dev | UI Lab",
  description: "Dev examples for Gallery component",
};

export default function Page() {
  return <ClientPage />;
}
