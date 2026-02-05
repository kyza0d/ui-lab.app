import { CopyPage } from './copy-page-button';

interface DocumentationHeaderProps {
  title: string;
  description?: string;
  showCopyButton?: boolean;
}

export function DocumentationHeader({
  title,
  description,
  showCopyButton = false,
}: DocumentationHeaderProps) {
  return (
    <div className='sticky'>
      {showCopyButton && (
        <div className="flex items-center justify-end">
          <CopyPage />
        </div>
      )}
      <div className="mb-10">
        <h4 className="text-md font-semibold text-foreground-50">{title}</h4>
        {description && (
          <p className="text-sm mt-1 text-foreground-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
