import * as React from "react";

function Coffee(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg height={48} viewBox="0 -960 960 960" width={48} {...props}>
         <path d="M160-120v-60h640v60H160zm151-140q-63 0-107-43.5T160-410v-430h660q24.75 0 42.375 17.625T880-780v160q0 24.75-17.625 42.375T820-560h-96v150q0 63-44 106.5T573-260H311zm0-60h261.978Q609-320 636.5-347.5T664-410v-370H220v370q0 35 28 62.5t63 27.5zm413-300h96v-160h-96v160zM311-320h-91 444-353z" />
      </svg>
   );
}

const MemoCoffee = React.memo(Coffee);
export default MemoCoffee;
