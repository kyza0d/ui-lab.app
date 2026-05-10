import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Typography | Dev | UI Lab",
  description: "Dev typography viewer",
};

export default function Page() {
  return <ClientPage />;
}
