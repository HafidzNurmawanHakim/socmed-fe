import * as React from "react";

function LeftChevron(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em" {...props}>
         <path d="M561-240L320-481l241-241 43 43-198 198 198 198-43 43z" />
      </svg>
   );
}

const MemoLeftChevron = React.memo(LeftChevron);
export default MemoLeftChevron;
