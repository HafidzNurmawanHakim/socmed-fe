import * as React from "react";

function Menu(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         width="1em"
         height="1em"
         {...props}
      >
         <path d="M4 6h16M4 12h16M4 18h7" />
      </svg>
   );
}

const MemoMenu = React.memo(Menu);
export default MemoMenu;
