import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Checkbox Examples | Dev | UI Lab",
  description: "Dev examples for Checkbox component",
};

export default function Page() {
  return <ClientPage />;
}
