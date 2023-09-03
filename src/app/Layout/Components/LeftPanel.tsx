"use client";

import { useState } from "react";
import { MemoCoffee, MemoHome, MemoImage } from "../../../assets";
import MemoPerson from "./Person";
import { useAppController } from "../core/AppController";

interface MenuProps {
   title: string;
   icon: React.JSX.Element;
}

export default function LeftPanel() {
   const { openPanel } = useAppController();

   return (
      <div
         id="left-panel"
         className={`bg-white hidden xl:block ${
            openPanel ? "basis-1/5 xl:basis-2/8 2xl:basis-3/8" : "basis-24"
         } dark:bg-darker rounded-xl m-2 custom-transition relative`}
      >
         <div className="h-16 pt-2 mb-2">
            <button className={`btn btn-ghost ${openPanel ? "ml-4" : "ml-1"}`}>
               <MemoCoffee fontSize={22} fill="#00ADB5" />
               <span className={`text-normal  ${openPanel ? "visible" : "invisible"}`}>Coffee</span>
            </button>
         </div>

         <div
            className={`rounded-lg w-[95%] mx-auto overflow-hidden relative ${
               openPanel ? "h-52" : "h-24"
            }`}
         >
            <div
               className={`${
                  openPanel ? "h-full w-full" : "h-0 w-0"
               } custom-transition blur-sm border-none absolute z-0 `}
               style={{
                  backgroundImage: `url('/images/bg-anim.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            ></div>
            <div className="w-full h-full absolute z-10">
               <div className="flex flex-col">
                  <div className="basis-1/2 py-4 pb-2">
                     <img
                        src="https://api.multiavatar.com/Binx Bond.png"
                        alt="Background"
                        className="rounded-full mx-auto w-[72px] h-[72px]"
                     />
                  </div>
                  <div className="basis-1/2  p-2 pt-0">
                     <div className={`text-center ${openPanel ? "block" : "hidden"} `}>
                        <div className="mb-0 text-white ">Hafidz hakim</div>
                        <div className="text-xs space-y-0 mb-1 text-white">@hafidz_nh</div>
                     </div>
                     <div className={`flex mt-3 ${openPanel ? "block" : "hidden"}`}>
                        <div className="basis-1/3 text-center">
                           <div>932k</div>
                           <div className="text-xs">Follower</div>
                        </div>
                        <div className="divider divider-horizontal "></div>

                        <div className="basis-1/3 text-center">
                           <div>932k</div>
                           <div className="text-xs">Hits</div>
                        </div>
                        <div className="divider divider-horizontal "></div>

                        <div className="basis-1/3 text-center">
                           <div>932k</div>
                           <div className="text-xs">Follower</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <ul className="menu w-[85%]  ml-2 bg-lessWhite dark:bg-darker rounded-box mt-6">
            <div className="ml-2 text-white">Menu</div>
            {menu.map((item: MenuProps, i) => {
               return (
                  <li key={i + item.title} className="custom-transition">
                     <a
                        className={`custom-transition ${openPanel ? "" : "tooltip"}`}
                        data-tip={item.title}
                     >
                        {item.icon}
                        <span
                           className={`custom-transition text-teal ml-4 ${
                              openPanel ? "" : "hidden"
                           }`}
                        >
                           {item.title}
                        </span>
                     </a>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

const menu: Array<MenuProps> = [
   {
      title: "Home",
      icon: <MemoHome fontSize={24} fill="#00ADB5" />,
   },
   {
      title: "Profile",
      icon: <MemoPerson fontSize={24} fill="#00ADB5" />,
   },
   {
      title: "Images",
      icon: <MemoImage fontSize={24} fill="#00ADB5" />,
   },
];
