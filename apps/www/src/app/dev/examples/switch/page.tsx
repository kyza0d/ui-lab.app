import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Switch Examples | Dev | UI Lab",
  description: "Dev examples for Switch component",
};

export default function Page() {
  return <ClientPage />;
}
