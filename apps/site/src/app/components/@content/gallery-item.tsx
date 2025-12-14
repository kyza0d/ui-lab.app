'use client';

import Link from 'next/link';
import { Gallery } from 'ui-lab-components';
import { usePrefetchOnHover } from '@/hooks/usePrefetchOnHover';

interface GalleryItemWithPrefetchProps {
  id: string;
  href: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  onPress: (href: string) => void;
}

export function GalleryItemWithPrefetch({
  id,
  href,
  name,
  description,
  preview,
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
        onPress={() => onPress(href)}
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Gallery.View
          style={{ aspectRatio: 'auto' }}
          className="px-4 flex items-center justify-center min-h-30 border-b border-background-700 gallery-preview"
        >
          {preview}
        </Gallery.View>

        <Gallery.Body>
          <h4>{name}</h4>
          <p className="text-sm text-foreground-400 line-clamp-2">
            {description}
          </p>
        </Gallery.Body>
      </Gallery.Item>
    </>
  );
}
