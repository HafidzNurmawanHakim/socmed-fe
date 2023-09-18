import { MemoDarkMode, MemoLightMode, MemoMenu, MemoNotif, MemoSearch } from "../../../assets";
import { useAppController } from "../core/AppController";
import { useTheme } from "../core/ThemeProvider";

export function Navbar() {
   const { setOpenPanel, openPanel } = useAppController();
   const { isDarkTheme, themeToggle } = useTheme();

   return (
      <div id="navbar" className="mr-2 mt-2 sticky top-0 z-10">
         <div className={`navbar bg-darker rounded-xl `}>
            <div className="navbar-start">
               <div>
                  <label
                     tabIndex={0}
                     className="btn btn-ghost btn-circle"
                     onClick={() => setOpenPanel(!openPanel)}
                  >
                     <MemoMenu fontSize={26} strokeWidth={2} stroke="teal" />
                  </label>
               </div>
            </div>
            <div className="navbar-center hidden lg:block">
               <div className="join">
                  <input
                     className="input focus:outline-none rounded-s-full bg-dark join-item "
                     placeholder="Search something..."
                  />
                  <button className="btn join-item bg-dark rounded-r-full">
                     <MemoSearch fontSize={26} strokeWidth={2} stroke="teal" />
                  </button>
               </div>
            </div>
            <div className="navbar-end">
               <button className="btn btn-ghost btn-circle" onClick={() => themeToggle()}>
                  {isDarkTheme ? (
                     <MemoDarkMode fontSize={26} strokeWidth={2} fill="#00ADB5" />
                  ) : (
                     <MemoLightMode fontSize={26} strokeWidth={2} fill="#00ADB5" />
                  )}
               </button>
               <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                     <MemoNotif fontSize={26} strokeWidth={2} stroke="teal" />
                     <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
               </button>
            </div>
         </div>
      </div>
   );
}
