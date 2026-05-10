import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Path Examples | Dev | UI Lab",
  description: "Dev examples for Path component",
};

export default function Page() {
  return <ClientPage />;
}
