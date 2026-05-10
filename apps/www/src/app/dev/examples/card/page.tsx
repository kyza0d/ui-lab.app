import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Card Examples | Dev | UI Lab",
  description: "Dev examples for Card component",
};

export default function Page() {
  return <ClientPage />;
}
