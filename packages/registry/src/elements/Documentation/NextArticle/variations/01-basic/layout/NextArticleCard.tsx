interface NextArticleCardProps {
  title: string;
  description: string;
  href: string;
}

export function NextArticleCard({ title, description, href }: NextArticleCardProps) {
  return (
    <a
      href={href}
      className="block bg-background-700 border border-background-600 rounded-md p-4 hover:border-accent-500 hover:bg-background-700/80 transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-xs text-foreground-400 mb-1">Next Article</div>
          <h3 className="text-lg font-semibold text-foreground-50 mb-2 group-hover:text-accent-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground-400">{description}</p>
        </div>
        <div className="ml-4 text-xl text-foreground-400 group-hover:text-accent-400 transition-colors flex-shrink-0">
          →
        </div>
      </div>
    </a>
  );
}
