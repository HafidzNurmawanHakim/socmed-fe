import * as React from "react";

function Search(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         width="1em"
         height="1em"
         {...props}
      >
         <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
   );
}

const MemoSearch = React.memo(Search);
export default MemoSearch;
