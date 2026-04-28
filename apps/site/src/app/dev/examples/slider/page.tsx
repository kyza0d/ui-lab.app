import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Slider Examples | Dev | UI Lab",
  description: "Dev examples for Slider component",
};

export default function Page() {
  return <ClientPage />;
}
