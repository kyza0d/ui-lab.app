import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Progress Examples | Dev | UI Lab",
  description: "Dev examples for Progress component",
};

export default function Page() {
  return <ClientPage />;
}
