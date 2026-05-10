import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Banner Examples | Dev | UI Lab",
  description: "Dev examples for Banner component",
};

export default function Page() {
  return <ClientPage />;
}
