import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Color Examples | Dev | UI Lab",
  description: "Dev examples for Color component",
};

export default function Page() {
  return <ClientPage />;
}
