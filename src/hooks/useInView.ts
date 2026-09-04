import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether an element is within `rootMargin` of the viewport.
 * Used to mount/unmount heavy children (live iframes) so only what's
 * near the screen is ever alive at once.
 */
export function useInView<T extends HTMLElement>(rootMargin = '300px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
