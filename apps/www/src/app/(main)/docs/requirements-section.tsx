export function RequirementsSection() {
  const requirementData = [
    { category: "Runtime", technology: "React", minimum: "19.0.0-rc" },
    { category: "Styling", technology: "Tailwind CSS", minimum: "4.0.0-alpha.20+" },
    { category: "Language", technology: "TypeScript", minimum: "5.6" },
    { category: "Bundler", technology: "Next.js App Router / Vite", minimum: "2024.12+" },
  ];

  return (
    <section className="text-xs">
      <div className="mb-6 font-semibold text-foreground-50">Runtime requirements</div>
      <div className="overflow-x-auto rounded-sm border border-background-800">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="border-b border-background-800 bg-background-900">
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">Technology</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">Minimum</th>
            </tr>
          </thead>
          <tbody>
            {requirementData.map((requirement) => (
              <tr key={requirement.category} className="border-b border-background-800 last:border-b-0">
                <td className="px-4 py-3 text-foreground-300">{requirement.category}</td>
                <td className="px-4 py-3 text-foreground-300">{requirement.technology}</td>
                <td className="px-4 py-3 text-foreground-300">
                  <code className="text-foreground-400">{requirement.minimum}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
