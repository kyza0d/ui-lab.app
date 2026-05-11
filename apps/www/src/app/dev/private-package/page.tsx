import { generateMetadata as buildMetadata } from "@/shared/lib/metadata";
import { Metadata } from "next";
import { PrivatePackagePlayground } from "../private-package-playground";
import { listPackages } from "./library";

const primaryPackage = listPackages()[0];

export const metadata: Metadata = buildMetadata({
  pathname: "/dev/private-package",
  title: primaryPackage?.displayName ?? "Private Package Preview",
  description: primaryPackage?.description,
});

export default function PrivatePackageDevPage() {
  return (
    <main className="p-8">
      <PrivatePackagePlayground />
    </main>
  );
}
