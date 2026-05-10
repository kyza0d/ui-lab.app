import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Panel Examples | Dev | UI Lab",
  description: "Dev examples for Panel component",
};

export default function Page() {
  return <ClientPage />;
}
