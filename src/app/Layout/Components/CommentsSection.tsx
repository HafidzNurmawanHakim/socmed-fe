import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { UserData, UserProfile } from "../../auth/core/types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../../services/post";
import { generateTimestamps } from "../../helper/helper";
import { ThunderboltFilled } from "@ant-design/icons";
import MemoReply from "../../../assets/Svg/Reply";
import { useAuth } from "../../auth/core/AuthProvider";

const { REACT_APP_BASE_URL } = process.env;

interface CommentsSectionProps {
   id_post: number;
   dataComments: InfiniteData<any> | undefined;
   commentsCount: number;
   fetchNextPage: () => Promise<any>;
   hasNextPage: boolean | undefined;
}

export type CommentPost = {
   author: UserProfile;
   comment: string;
   created_at: string;
   user: number;
};

const CommentsSection: FC<CommentsSectionProps> = ({
   id_post,
   dataComments,
   commentsCount,
   fetchNextPage,
   hasNextPage,
}) => {
   const [commented, setCommented] = useState<boolean>(false);
   return (
      <div
         className="max-h-96 overflow-y-scroll bg-lessLight dark:bg-dark scrollbar rounded p-1"
         key={id_post}
      >
         {dataComments?.pages.map((items: CommentPost[], i) => {
            return items.length > 0 ? (
               items.map((item, j) => {
                  console.log(item.author.profile_image);
                  return (
                     <div
                        key={i + j}
                        className=" pl-4 pr-0 relative mb-2 dark:bg-darker rounded-md relative py-2 bg-white"
                     >
                        <div className="flex justify-between">
                           <div className="w-16 mt-1">
                              <div className="chat-image avatar">
                                 <div className="w-10 mask mask-squircle">
                                    <img
                                       src={
                                          !!item.author.profile_image
                                             ? `${REACT_APP_BASE_URL}/api${item.author?.profile_image}`
                                             : `https://ui-avatars.com/api/?name=${item.author?.username}`
                                       }
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="w-[90%] ">
                              <div className="chat-header dark:text-white font-bold mb-1">
                                 {item.author?.username}
                                 <time className="text-xs opacity-50 ml-1 font-light ml-2">
                                    {generateTimestamps(item.created_at)}
                                 </time>
                              </div>
                              <div className="dark:text-light font-normal text-sm">
                                 <p className="break-all">{item.comment}</p>
                              </div>
                              <div className="chat-footer mt-2">
                                 <span className="opacity-50 dark:text-light cursor-pointer hover:text-teal dark:hover:text-white">
                                    Lihat balasan
                                 </span>
                              </div>
                           </div>

                           <div className="flex flex-col items-start">
                              <button
                                 tabIndex={0}
                                 className="btn btn-sm mt-1 hover:bg-light bg-lessLight dark:bg-dark border-none hover:dark:bg-dark hover:dark:border-darker mx-1"
                              >
                                 <ThunderboltFilled className="text-warning text-md" />
                              </button>
                              {/* <span className="normal-case text-center text-xs dark:text-light text-teal w-full mb-1">
                    0
                  </span> */}

                              <>
                                 <button
                                    tabIndex={0}
                                    className="btn btn-sm mt-1 hover:bg-light  bg-lessLight dark:bg-dark border-none hover:dark:bg-dark hover:dark:border-darker mx-1"
                                 >
                                    <MemoReply fill="teal" className="text-teal text-md" />
                                 </button>
                                 {/* <span className="normal-case text-center text-xs dark:text-light text-teal w-full mb-1">
                    0
                  </span> */}
                              </>
                           </div>
                        </div>
                     </div>
                  );
               })
            ) : (
               <div key={id_post}></div>
            );
         })}
         {commentsCount > 0 && hasNextPage && (
            <div
               className="text-center cursor-pointer dark:text-light text-xs normal-case dark:hover:text-white text-teal"
               onClick={() => fetchNextPage()}
            >
               Lihat lebih banyak
            </div>
         )}
      </div>
   );
};

export default CommentsSection;
