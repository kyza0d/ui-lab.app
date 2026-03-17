import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Grid Examples | Dev | UI Lab",
  description: "Dev examples for Grid component",
};

export default function Page() {
  return <ClientPage />;
}
