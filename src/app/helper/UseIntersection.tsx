import React, { MutableRefObject, RefObject } from "react";

interface IntersectionObserverProps {
   root?: RefObject<Element>;
   target?: MutableRefObject<Element | null | undefined>;
   onIntersect: () => void;
   threshold?: number;
   rootMargin?: string;
   enabled?: boolean;
}

export default function useIntersectionObserver({
   root,
   target,
   onIntersect,
   threshold = 0.4,
   rootMargin = "50%",
   enabled = true,
}: IntersectionObserverProps) {
   React.useEffect(() => {
      if (!enabled) {
         return;
      }

      const observer = new IntersectionObserver(
         (entries) =>
            entries.forEach((entry) => {
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
   }, [target, enabled]);
}
