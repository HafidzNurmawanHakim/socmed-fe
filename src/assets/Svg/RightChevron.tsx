import * as React from "react";

function RightChevron(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em" {...props}>
         <path d="M530-481L332-679l43-43 241 241-241 241-43-43 198-198z" />
      </svg>
   );
}

const MemoRightChevron = React.memo(RightChevron);
export default MemoRightChevron;
