import React, { useState, useEffect } from "react";
import { MemoLoc } from "../../../assets";
import MemoTripleDot from "../../../assets/Svg/TripleDot";
import MemoReply from "../../../assets/Svg/Reply";
import MemoHeart from "../../../assets/Svg/Heart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
   CaretLeftOutlined,
   CaretRightOutlined,
   HeartFilled,
   HeartOutlined,
   MessageOutlined,
   SendOutlined,
   ShareAltOutlined,
   ThunderboltFilled,
} from "@ant-design/icons";
import { UserData } from "../../auth/core/types";
import { formatTagsInText, generateTimestamps } from "../../helper/helper";
import Slider from "react-slick";
import Carousel from "./Carousel";
import {
   createComments,
   getComments,
   getLikePost,
   likePost,
   unlikePost,
} from "../../../services/post";
import { toast } from "react-toastify";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";
import { useAuth } from "../../auth/core/AuthProvider";

export type ImageObj = {
   image: string;
};

type Content = {
   content: string;
   created_at: string;
   updated_at: string;
   author: UserData;
   id: number;
   images: Array<ImageObj>;
};

type CommentPost = {
   author_comment: UserData;
   comment: string;
   created_at: string;
   user: number;
};

interface ContentSectionProps {
   data: Content;
}

type LikePost = {
   like_id: number;
   created_at: string;
   updated_at: string;
   user: number;
   post: 33;
};

export const ContentSection = (props: ContentSectionProps) => {
   const { content, created_at, updated_at, author, id, images } = props.data;
   const { dataUser } = useAuth();

   const [index, setIndex] = useState<number>(0);
   const [comment, setComment] = useState("");
   const [allComments, setAllComments] = useState([]);
   const [fetching, setFetching] = useState<boolean>(true);
   const [pageParams, setNextPageParams] = useState<number | undefined>(1);
   const [liked, setLiked] = useState<boolean>(false);
   const [liker, setLiker] = useState<UserData[]>([]);

   const getLike = async () => {
      const res = await getLikePost(id);
      res.data.filter((item: LikePost, i: number) =>
         item.user === dataUser?.id ? setLiked(true) : setLiked(false)
      );
      if (res.status === 200) setLiker(res.data);
   };

   const {
      data: dataComments,
      error,
      isLoading,
      isFetching,
      hasNextPage,
      fetchNextPage,
      fetchPreviousPage,
      hasPreviousPage,
      isFetchingNextPage,
      isFetchingPreviousPage,
      refetch,
   } = useInfiniteQuery({
      queryKey: [`dataCommentPost-${id}`],
      queryFn: ({ pageParam = pageParams }) =>
         getComments(id, pageParam).then((res) => {
            if (res.data.next) {
               setNextPageParams((prev) => prev && prev + 1);
            } else {
               setNextPageParams(undefined);
            }
            return res.data.results;
         }),
      enabled: fetching,
      getNextPageParam(lastPage, page) {
         if (pageParams) return pageParams;

         return undefined;
      },
   });

   useEffect(() => {
      getLike();
      if (dataComments) {
         setFetching(false);
      }
   }, [dataComments]);

   const newComments = async () => {
      if (comment.trim() === "") return;

      const body = {
         comment: comment,
      };

      const data = await createComments(body, id);

      if (data.status === 201) {
         setComment("");
         toast.success("Post successfully!", {
            position: "bottom-left",
            autoClose: 1500,
            theme: "dark",
         });
      }
   };

   const handleKeyDown = (e: any) => {
      if (e.key === "Enter" && !e.shiftkey) {
         return newComments();
      }
   };

   const handleLike = async () => {
      const body = { post: id };
      const res = await likePost(body);

      if (res.status === 200) setLiked(true);
   };

   const handleUnlike = async () => {
      const res = await unlikePost(id);
      if (res.status === 200) setLiked(false);
   };

   return (
      <div id="content-section" className="rounded-md p-2 mb-4 bg-white dark:bg-dark ">
         <div id="creator-section" className=" flex ml-1 p-2">
            <div className="basis-10">
               <div className="avatar ">
                  <div className="w-12 rounded">
                     <img
                        src="https://api.multiavatar.com/Binx Bond.png"
                        alt="Tailwind-CSS-Avatar-component"
                     />
                  </div>
               </div>
            </div>
            <div className="basis-auto  pl-4 w-full relative">
               <div id="creator-name" className="text-dark dark:text-white">
                  {author.username}
               </div>
               <div id="content-status" className="py-0 flex items-center text-sm mt-1">
                  <MemoLoc fill="teal" stroke="teal" strokeWidth={8} className="text-lg" />
                  <span className="text-xs text-teal ml-1">Jakarta</span>
               </div>
               <div className="dropdown dropdown-end absolute right-2 top-0">
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                     <MemoTripleDot
                        fontSize={28}
                        fill="teal"
                        stroke="teal"
                        strokeWidth={2}
                        className="material-symbols-outlined"
                     />
                  </label>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                     <li className="text-dark dark:text-light">
                        <a>Report this shit</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div id="content" className="px-2 ">
            <div id="text-content" className="mb-2">
               <p className="text-dark dark:text-light text-sm">{formatTagsInText(content)}</p>
            </div>
            <div id="image-content" className=" ">
               {images.length > 0 ? (
                  <Carousel images={images} index={index} setIndex={setIndex} />
               ) : (
                  <></>
               )}
            </div>

            <div className="divider my-0 mt-2">
               {images.length > 1 &&
                  images.map((item, i) => {
                     return (
                        <span
                           key={i}
                           className={`w-4 h-2 rounded-full ${
                              i === index ? "bg-teal" : "bg-[#bbb] dark:bg-darker"
                           }`}
                        ></span>
                     );
                  })}
            </div>

            <div id="content-hits" className="w-full  flex mb-2">
               <label className="btn btn-sm swap swap-rotate text-xl bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" />

                  <div className="swap-on fill-current">
                     <HeartFilled className=" text-red text-[22px] pb-1" />
                     <span className="normal-case text-xs ml-2 ">
                        {liker.length > 0 && liker.length}
                     </span>
                  </div>
                  <div className="swap-off fill-current">
                     <HeartOutlined className=" text-teal text-[22px] pb-1" />
                     <span className="normal-case text-xs ml-2">
                        {liker.length > 0 && liker.length}
                     </span>
                  </div>
               </label>
               <button
                  tabIndex={0}
                  className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1"
               >
                  <MessageOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs">289k</span>
               </button>
               <button
                  tabIndex={0}
                  className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1"
               >
                  <ShareAltOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs">289k</span>
               </button>
            </div>

            <div className="max-h-96 overflow-y-scroll bg-lessLight dark:bg-dark scrollbar mb-2 rounded p-1">
               {dataComments?.pages.map((items: CommentPost[], i) => {
                  return items.length > 0 ? (
                     items.map((item, j) => {
                        return (
                           <div
                              key={i + j}
                              className=" pl-4 pr-0 relative mb-2 dark:bg-darker rounded-md relative py-2 bg-white"
                           >
                              <div className="flex justify-between">
                                 <div className="w-16 mt-1">
                                    <div className="chat-image avatar">
                                       <div className="w-10 rounded-full">
                                          <img src="https://api.multiavatar.com/Binx Bond.png" />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="w-[90%] ">
                                    <div className="chat-header dark:text-white font-bold mb-1">
                                       {item.author_comment?.username}
                                       <time className="text-xs opacity-50 ml-1 font-light ml-2">
                                          {generateTimestamps(item.created_at)}
                                       </time>
                                    </div>
                                    <div className="dark:text-light font-normal text-sm">
                                       <p className="break-all">{item.comment}</p>
                                    </div>
                                    <div className="chat-footer opacity-50 dark:text-light mt-2 cursor-pointer hover:text-teal dark:hover:text-white">
                                       Lihat balasan
                                    </div>
                                 </div>

                                 <div className="flex flex-col items-center  pb-1">
                                    <button
                                       tabIndex={0}
                                       className="btn btn-sm mt-1 hover:bg-light bg-lessLight dark:bg-dark border-none hover:dark:bg-dark hover:dark:border-darker mx-1"
                                    >
                                       <ThunderboltFilled className="text-warning mb-1 text-xl" />
                                    </button>
                                    <button
                                       tabIndex={0}
                                       className="btn btn-sm mt-1 hover:bg-light  bg-lessLight dark:bg-dark border-none hover:dark:bg-dark hover:dark:border-darker mx-1"
                                       onClick={() => newComments()}
                                    >
                                       <MemoReply fill="teal" className="text-teal mb-1 text-xl" />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <>Belum Ada comment nih</>
                  );
               })}
            </div>

            {/* <div className="comment flex space-x-4 items-start mx-4">
               <div className="avatar mt-1">
                  <div className="w-10 ">
                     <img
                        src="https://api.multiavatar.com/Binx Bond.png"
                        alt="Tailwind-CSS-Avatar-component"
                        className="mask mask-squircle"
                     />
                  </div>
               </div>
               <div className="comment-content flex-1 pb-2">
                  <p className="text-dark dark:text-white ">Sukirman</p>
                  <div className="social-icons flex space-x-2 items-center justify-between">
                     
                     <input
                        className={`input input-sm dark:text-light w-full focus:outline-none bg-lessWhite dark:bg-dark ${
                           comment.length === 0 && "max-h-8"
                        }`}
                        value="hhe"
                        name="otherComment"
                        readOnly
                     />
                     <div className="flex">
                        <a href="#" className="">
                           <button
                              tabIndex={0}
                              className="btn btn-sm bg-lessLight dark:bg-dark border-none hover:bg-white mx-1"
                           >
                              <ThunderboltFilled className="text-warning mb-1 text-xl" />
                           </button>
                        </a>
                        <a href="#" className="">
                           <button
                              tabIndex={0}
                              className="btn btn-sm bg-lessLight dark:bg-dark border-none hover:bg-white mx-1"
                              onClick={() => newComments()}
                           >
                              <MemoReply fill="teal" className="text-teal mb-1 text-xl" />
                           </button>
                        </a>
                     </div>
                  </div>
               </div>
            </div> */}

            <div className="comment-section bg-lessWhite  dark:bg-darker py-1 px-2 rounded-xl">
               <div className="comment flex space-x-4 items-start mt-2">
                  <div className="avatar mt-1">
                     <div className="w-10 rounded bg-teal">
                        <img
                           src="https://api.multiavatar.com/Binx Bond.png"
                           alt="Tailwind-CSS-Avatar-component"
                        />
                     </div>
                  </div>
                  <div className="comment-content flex-1 pb-2">
                     <p className="text-dark dark:text-white ">Sukirman</p>
                     <div className="social-icons flex space-x-2 items-center justify-between">
                        {/* Ikon-ikon Media Sosial */}
                        <textarea
                           className={` textarea textarea-sm dark:text-light w-full focus:outline-none bg-lessWhite dark:bg-dark ${
                              comment.length === 0 && "max-h-8"
                           }`}
                           placeholder="Comment..."
                           name="comment"
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                           onKeyDown={handleKeyDown}
                        />
                        <div className="flex">
                           <a href="#" className="">
                              <button
                                 tabIndex={0}
                                 className="btn bg-lessLight dark:bg-dark border-none hover:bg-white mx-1"
                                 onClick={() => newComments()}
                              >
                                 <SendOutlined className="text-teal mb-1 text-xl" />
                              </button>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Tambahkan lebih banyak komentar di sini */}
            </div>
         </div>
      </div>
   );
};
