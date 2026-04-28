import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Badge Examples | Dev | UI Lab",
  description: "Dev examples for Badge component",
};

export default function Page() {
  return <ClientPage />;
}
