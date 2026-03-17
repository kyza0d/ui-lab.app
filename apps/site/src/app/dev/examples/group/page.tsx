import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Group Examples | Dev | UI Lab",
  description: "Dev examples for Group component",
};

export default function Page() {
  return <ClientPage />;
}
