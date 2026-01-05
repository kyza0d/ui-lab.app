'use client';

import Link from 'next/link';
import { Gallery } from 'ui-lab-components';
import { usePrefetchOnHover } from '@/shared';

interface GalleryItemWithPrefetchProps {
  id: string;
  href: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  experimental?: boolean;
  onPress: (href: string) => void;
}

export function GalleryItemWithPrefetch({
  id,
  href,
  name,
  description,
  preview,
  experimental,
  onPress,
}: GalleryItemWithPrefetchProps) {
  const { onMouseEnter, onMouseLeave } = usePrefetchOnHover(href);

  return (
    <>
      <Link
        href={href}
        prefetch={false}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ display: 'none' }}
      />
      <Gallery.Item
        key={id}
        href={href}
        className='group hover:bg-background-900/50'
        orientation='horizontal'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onPress(href)}
      >
        <Gallery.View
          className="min-w-60 flex items-center justify-center relative bg-transparent min-h-40 group-hover:border-background-600 border-r border-background-700"
        >
          <div className='w-full px-4 gap-2 flex items-center justify-center'>
            {preview}
          </div>
          <div className='absolute top-0 left-0 w-full h-full'>
            <div className='hidden grid-paper' />
          </div>
        </Gallery.View>

        <Gallery.Body>
          <div className="flex items-center gap-1">
            <h4>{name}</h4>
            {experimental && (
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-accent-500/20 text-accent-300 rounded">
                Experimental
              </span>
            )}
          </div>
          <p className="text-foreground-400 text-sm">
            {description}
          </p>
        </Gallery.Body>
      </Gallery.Item>
    </>
  );
}
