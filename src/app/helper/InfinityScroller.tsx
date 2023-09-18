import React, { ReactNode, useRef } from "react";
import useIntersectionObserver from "./UseIntersection";

interface InfiniteScrollerProps {
   children: ReactNode;
   hasMore?: boolean;
   loadMore: () => void;
   [otherProps: string]: any; // Properti tambahan jika diperlukan
}

const InfiniteScroller = ({
   children,
   hasMore,
   loadMore,
   ...otherProps
}: InfiniteScrollerProps) => {
   const ref = useRef<HTMLDivElement | null>(null);
   useIntersectionObserver({
      onIntersect: loadMore,
      enabled: hasMore,
      target: ref,
   });
   return (
      <div {...otherProps}>
         {children}
         <div
            className="target"
            style={{ padding: "20px", visibility: "hidden" }}
            ref={ref}
            id="lala"
         />
      </div>
   );
};

export default InfiniteScroller;
