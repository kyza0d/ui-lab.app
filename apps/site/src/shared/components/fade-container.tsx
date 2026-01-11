import { cn } from "@/shared/lib/utils";

interface FadeContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeContainer({ children, className }: FadeContainerProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10"
        style={{
          right: 8,
          backgroundColor: "var(--background-950)",
          WebkitMaskImage: `
            linear-gradient(to bottom, black 0%, transparent 24px),
            linear-gradient(to top, black 0%, transparent 24px)
          `,
          maskImage: `
            linear-gradient(to bottom, black 0%, transparent 24px),
            linear-gradient(to top, black 0%, transparent 24px)
          `,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
