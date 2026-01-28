interface ThoughtStepProps {
  number: number;
  title: string;
  description: string;
}

export function ThoughtStep({ number, title, description }: ThoughtStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-accent-500 text-foreground-50 flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        {number < 4 && <div className="w-1 h-8 bg-accent-500 mt-2" />}
      </div>
      <div className="flex-1 pt-1 pb-4">
        <h3 className="font-semibold text-foreground-50 mb-1">{title}</h3>
        <p className="text-sm text-foreground-400">{description}</p>
      </div>
    </div>
  );
}
