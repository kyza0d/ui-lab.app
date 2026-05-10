import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Flex Examples | Dev | UI Lab",
  description: "Dev examples for Flex component",
};

export default function Page() {
  return <ClientPage />;
}
