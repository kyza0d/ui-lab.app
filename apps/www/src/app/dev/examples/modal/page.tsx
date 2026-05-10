import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Modal Examples | Dev | UI Lab",
  description: "Dev examples for Modal component",
};

export default function Page() {
  return <ClientPage />;
}
