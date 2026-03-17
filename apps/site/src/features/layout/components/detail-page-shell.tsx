import { ReactNode } from "react";

interface DetailPageShellProps {
  name: string;
  description: string;
  tags: string[];
  dependencies?: string[];
  children?: ReactNode;
  notFoundLabel?: string;
}

export function DetailPageShell({
  name,
  description,
  tags,
  dependencies,
  children,
  notFoundLabel,
}: DetailPageShellProps) {
  if (notFoundLabel !== undefined) {
    return (
      <div className="w-full bg-background-950 mx-auto pt-12 pb-12">
        <div className="mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-foreground-400">{notFoundLabel}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-(--header-height)">
      <div className="w-full bg-background-950 mx-auto min-h-screen flex flex-col pt-4 pb-12">
        <div className="w-full mx-auto px-4 flex flex-col flex-1">
          <div className="mb-28">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground-50 mb-2">
                  {name}
                </h1>
                <p className="text-foreground-400 max-w-2xl">{description}</p>
              </div>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-1 text-sm bg-background-900 border border-background-700 text-foreground-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-32 flex-1">{children}</div>

          {dependencies && dependencies.length > 0 && (
            <div className="mt-12 pt-12">
              <h4 className="text-lg font-semibold text-foreground-50 mb-4">
                Dependencies
              </h4>
              <div className="space-y-2">
                {dependencies.map((dep) => (
                  <div
                    key={dep}
                    className="text-sm w-fit text-foreground-400 px-3 py-2 bg-background-800 rounded border border-background-700"
                  >
                    {dep}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
