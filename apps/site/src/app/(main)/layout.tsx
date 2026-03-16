import { ClientShell } from "@/features/layout/components/client-shell";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientShell>
      {children}
    </ClientShell>
  );
}
