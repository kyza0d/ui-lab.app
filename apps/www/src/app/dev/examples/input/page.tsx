import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Input Examples | Dev | UI Lab",
  description: "Dev examples for Input component",
};

export default function Page() {
  return <ClientPage />;
}
