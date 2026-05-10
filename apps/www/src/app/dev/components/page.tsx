import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Components | Dev | UI Lab",
  description: "Dev component browser",
};

export default function Page() {
  return <ClientPage />;
}
