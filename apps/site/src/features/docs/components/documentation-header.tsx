import { CopyPage } from './copy-page-button';

interface DocumentationHeaderProps {
  title: string;
  description?: string;
  showCopyButton?: boolean;
}

export function DocumentationHeader({
  title,
  description,
  showCopyButton = true,
}: DocumentationHeaderProps) {
  return (
    <div className='sticky'>
      {showCopyButton && (
        <div className="flex items-center justify-end">
          <CopyPage />
        </div>
      )}
      <div className="mb-10">
        <div className="text-base font-semibold text-foreground-50">{title}</div>
        {description && (
          <div className="mt-1 text-foreground-300">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
