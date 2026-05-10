import type { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Group Select | Dev | UI Lab",
  description: "Dev group-select examples",
};

export default function Page() {
  return <ClientPage />;
}
