import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "List Examples | Dev | UI Lab",
  description: "Dev examples for List component",
};

export default function Page() {
  return <ClientPage />;
}
