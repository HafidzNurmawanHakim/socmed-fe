import React from "react";
import { MemoAt, MemoImage, MemoLoc } from "../../../assets";

const ContentCreator = () => {
   return (
      <div>
         <div className="flex flex-col rounded-md space-x-4 mb-4 bg-dark">
            <div className="flex w-full">
               <div className="basis-16  mt-2 ml-2">
                  <img
                     src="https://api.multiavatar.com/Binx Bond.png"
                     alt="Background"
                     className="rounded-full mt-1 mx-auto w-10 h-10"
                  />
               </div>
               <div className="basis-auto mt-2 border-b border-darker w-full">
                  <input
                     type="text"
                     placeholder="What's on your mind?"
                     className="input w-full bg-dark  rounded-full focus:outline-none"
                  />
               </div>
            </div>

            <div className="flex mt-4 justify-between ">
               <div className="ml-2 mb-2 w-40 bg-dark flex justify-around">
                  <button className="btn btn-ghost btn-circle">
                     <MemoImage fontSize={24} fill="teal" />
                  </button>
                  <button className="btn btn-ghost btn-circle">
                     <MemoLoc fontSize={24} fill="teal" />
                  </button>
                  <button className="btn btn-ghost btn-circle">
                     <MemoAt fontSize={24} fill="teal" />
                  </button>
               </div>
               <button className="btn btn-sm bg-teal text-white mt-2 mr-4 rounded-md">Post</button>
            </div>
         </div>
      </div>
   );
};

export default ContentCreator;
