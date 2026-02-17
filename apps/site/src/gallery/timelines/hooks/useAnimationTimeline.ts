import { useRef, useEffect } from "react";
import gsap from "gsap";

interface UseAnimationTimelineOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  createTimeline: () => gsap.core.Timeline | null;
  onBeforeMount?: () => void;
}

/**
 * React hook that manages GSAP timeline lifecycle with parent element event listeners
 * Automatically plays on mouseenter and reverses on mouseleave
 *
 * @param options - Configuration object
 */
export function useAnimationTimeline(options: UseAnimationTimelineOptions) {
  const { containerRef, createTimeline, onBeforeMount } = options;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    onBeforeMount?.();

    if (!containerRef.current) return;

    timelineRef.current = createTimeline();

    const galleryItem = containerRef.current.closest('[role="button"]');
    if (!galleryItem) return;

    const handleMouseEnter = () => {
      timelineRef.current?.play();
    };

    const handleMouseLeave = () => {
      timelineRef.current?.reverse();
    };

    galleryItem.addEventListener("mouseenter", handleMouseEnter);
    galleryItem.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      galleryItem.removeEventListener("mouseenter", handleMouseEnter);
      galleryItem.removeEventListener("mouseleave", handleMouseLeave);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [containerRef, createTimeline, onBeforeMount]);
}
