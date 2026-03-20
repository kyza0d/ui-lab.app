"use client";

import { useState } from "react";

interface YouTubeBannerProps {
  videoId: string;
  title: string;
}

export function YouTubeBanner({ videoId, title }: YouTubeBannerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-4 aspect-7/3 border-b border-background-700/40 w-full text-sm font-medium">
      <div className="relative w-full h-full overflow-hidden rounded-md border border-background-700 bg-background-900/20">
        {isPlaying ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 block h-full w-full cursor-pointer"
            aria-label={`Play ${title}`}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt=""
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-background-950/15 to-background-950/10 transition-opacity group-hover:opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16  items-center justify-center rounded-full border border-background-700 bg-background-900 text-foreground-200 backdrop-blur-sm transition-transform">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                  <path d="M8 6.82v10.36a1 1 0 0 0 1.53.85l8.14-5.18a1 1 0 0 0 0-1.7L9.53 5.97A1 1 0 0 0 8 6.82Z" />
                </svg>
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
