interface Release {
  version: string;
  date: string;
  changes: string[];
}

const releases: Release[] = [
  {
    version: "1.2.0",
    date: "2026-01-28",
    changes: [
      "Added opacity slider to Color component",
      "Format switching between HEX, RGB, and HSL",
      "Improved keyboard navigation for color picker",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-01-15",
    changes: [
      "Ghost variant for Group buttons",
      "Enhanced Group.Select component",
      "Better active state handling",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-01",
    changes: [
      "Initial stable release",
      "20+ accessible components",
      "Full dark mode support",
      "Tailwind CSS v4 integration",
      "React Aria foundation",
    ],
  },
];

export default function ReleasesPage() {
  return (
    <div className="py-20">
      <div className="mb-10">
        <h1 className="text-md font-semibold text-foreground-50">Releases</h1>
        <p className="text-sm mt-1 text-foreground-300">Version history and changelog.</p>
      </div>
      <div className="space-y-10">
        {releases.map((release) => (
          <section key={release.version} id={`v${release.version}`} className="border-b border-background-800 pb-8 last:border-0">
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-base font-medium text-foreground-100">v{release.version}</h2>
              <span className="text-sm text-foreground-500">{release.date}</span>
            </div>
            <ul className="space-y-1.5 text-sm text-foreground-300">
              {release.changes.map((change, i) => (
                <li key={i}>— {change}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
