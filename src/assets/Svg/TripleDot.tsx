import * as React from "react";

function TripleDot(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
         <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
   );
}

const MemoTripleDot = React.memo(TripleDot);
export default MemoTripleDot;
