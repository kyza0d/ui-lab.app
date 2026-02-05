'use client';

import Link from 'next/link';
import { Gallery, Tooltip } from 'ui-lab-components';
import { usePrefetchOnHover } from '@/shared';
import { FaFlask } from 'react-icons/fa6';

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
        className='group bg-background-950 flex-col md:flex-row'
        orientation='horizontal'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onPress(href)}
      >
        <Gallery.View
          className="w-full md:w-1/3 md:min-w-1/3 md:max-w-1/3 flex items-center justify-center relative bg-background-950 min-h-40 group-hover:border-background-600 border-b md:border-b-0 md:border-r border-background-700 flex-shrink-0"
        >
          <div className='w-full px-4 gap-2 flex items-center justify-center'>
            {preview}
          </div>
          <div className='absolute top-0 left-0 w-full h-full'>
            <div className='hidden grid-paper' />
          </div>
        </Gallery.View>

        <Gallery.Body>
          <div className="relative flex items-center gap-1 w-full">
            <h4>{name}</h4>
            {experimental && (
              <div className='ml-auto'>
                <Tooltip content="Experimental: Not fully implemented and requires testing" position="top" showArrow>
                  <span className="ml-auto inline-block px-2 py-1 text-xs font-semibold bg-accent-500/20 text-accent-300 rounded-md">
                    <FaFlask size={14} />
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
          <p className="text-foreground-400 text-md">
            {description}
          </p>
        </Gallery.Body>
      </Gallery.Item>
    </>
  );
}
