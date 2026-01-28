interface NextArticleWithIconCardProps {
  icon: string;
  title: string;
  description: string;
  category: string;
  href: string;
}

export function NextArticleWithIconCard({
  icon,
  title,
  description,
  category,
  href,
}: NextArticleWithIconCardProps) {
  return (
    <a
      href={href}
      className="flex items-start gap-4 p-4 bg-background-700 border border-background-600 rounded-md hover:border-accent-500 hover:bg-background-700/80 transition-colors group"
    >
      <div className="text-3xl flex-shrink-0 mt-1">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-accent-400 font-medium mb-1">{category}</div>
        <h3 className="text-lg font-semibold text-foreground-50 mb-1 group-hover:text-accent-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-foreground-400">{description}</p>
      </div>
      <div className="text-foreground-500 group-hover:text-accent-400 transition-colors flex-shrink-0 text-lg">
        →
      </div>
    </a>
  );
}
