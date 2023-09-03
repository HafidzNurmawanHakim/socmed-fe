import * as React from "react";

function Home(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em" {...props}>
         <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160zm320-353z" />
      </svg>
   );
}

const MemoHome = React.memo(Home);
export default MemoHome;
