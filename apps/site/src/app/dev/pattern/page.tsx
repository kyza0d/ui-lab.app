import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Pattern | Dev | UI Lab",
  description: "Dev pattern viewer",
};

export default function Page() {
  return <ClientPage />;
}
