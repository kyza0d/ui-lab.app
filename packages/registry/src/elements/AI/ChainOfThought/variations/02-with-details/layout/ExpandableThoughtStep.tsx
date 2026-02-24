interface ExpandableThoughtStepProps {
  number: number;
  title: string;
  description: string;
  details: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function ExpandableThoughtStep({
  number,
  title,
  description,
  details,
  isExpanded,
  onToggle,
}: ExpandableThoughtStepProps) {
  return (
    <div className="bg-background-800 border border-background-700 rounded-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-4 hover:bg-background-700/50 transition-colors text-left"
      >
        <div className="w-10 h-10 rounded-full bg-accent-500 text-foreground-50 flex items-center justify-center font-bold text-sm flex-shrink-0">
          {number}
        </div>
        <div className="flex-1 pt-1">
          <h3 className="font-semibold text-foreground-50 mb-1">{title}</h3>
          <p className="text-sm text-foreground-400">{description}</p>
        </div>
        <span className="text-foreground-400 flex-shrink-0 mt-1">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="border-t border-background-700 bg-background-700/30 p-4">
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li key={index} className="flex gap-3 text-sm text-foreground-300">
                <span className="text-accent-400 flex-shrink-0">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
