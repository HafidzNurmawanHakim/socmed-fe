import * as React from "react";

function Reply(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em" {...props}>
         <path d="M783-184v-171q0-58-37.5-95.5T650-488H245l159 159-53 51-247-247 247-247 53 52-159 159h405q88 0 147 59t59 147v171h-73z" />
      </svg>
   );
}

const MemoReply = React.memo(Reply);
export default MemoReply;
