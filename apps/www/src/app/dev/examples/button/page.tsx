import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Button Examples | Dev | UI Lab",
  description: "Dev examples for Button component",
};

export default function Page() {
  return <ClientPage />;
}
