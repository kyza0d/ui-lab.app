import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Menu Examples | Dev | UI Lab",
  description: "Dev examples for Menu component",
};

export default function Page() {
  return <ClientPage />;
}
