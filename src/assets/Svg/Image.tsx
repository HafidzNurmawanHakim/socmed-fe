import * as React from "react";

function Image(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg height="1em" viewBox="0 -960 960 960" width="1em" {...props}>
         <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180zm0-60h600v-600H180v600zm56-97h489L578-473 446-302l-93-127-117 152zm-56 97v-600 600z" />
      </svg>
   );
}

const MemoImage = React.memo(Image);
export default MemoImage;
