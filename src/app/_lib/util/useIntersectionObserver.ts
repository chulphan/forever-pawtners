import { RefObject, useEffect } from 'react';

export default function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = '0px',
  target,
  threshold = 0.1,
}: {
  enabled: boolean;
  onIntersect(): Promise<any>;
  root?: RefObject<HTMLElement>;
  rootMargin?: string;
  target: RefObject<HTMLElement>;
  threshold?: number;
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          console.log(entry);
          entry.isIntersecting && onIntersect();
        }),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled, onIntersect]);
}
