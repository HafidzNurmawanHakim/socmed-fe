import React, { useState, useEffect } from "react";
import { MemoLoc } from "../../../assets";
import MemoTripleDot from "../../../assets/Svg/TripleDot";
import MemoReply from "../../../assets/Svg/Reply";
import {
   HeartFilled,
   HeartOutlined,
   MessageOutlined,
   SendOutlined,
   ShareAltOutlined,
   ThunderboltFilled,
} from "@ant-design/icons";
import { UserData, UserProfile } from "../../auth/core/types";
import { formatTagsInText, generateTimestamps } from "../../helper/helper";
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
import CommentsSection, { CommentPost } from "./CommentsSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, selectLikerByPostId } from "../../../redux/store";
import { FetchLikePost } from "../../../redux/reducers/posts/PostsThunk";
import { LikerPost } from "../../types/_postTypes";

const { REACT_APP_BASE_URL } = process.env;

export type ImageObj = {
   image: string;
};

type Content = {
   content: string;
   created_at: string;
   updated_at: string;
   author: UserProfile;
   id_post: number;
   images: Array<ImageObj>;
};

interface ContentSectionProps {
   data: Content;
}

export const ContentSection = (props: ContentSectionProps) => {
   const { content, created_at, updated_at, author, id_post, images } = props.data;
   const { dataUser } = useAuth();
   const dispatch = useDispatch<AppDispatch>();
   const [index, setIndex] = useState<number>(0);
   const [comment, setComment] = useState("");
   const [allComments, setAllComments] = useState([]);
   const [fetching, setFetching] = useState<boolean>(true);
   const [pageParams, setNextPageParams] = useState<number | undefined>(1);
   const [liked, setLiked] = useState<boolean>(false);
   const [commentsCount, setCommentsCount] = useState<number>(0);
   const liker = useSelector((state: RootState) => selectLikerByPostId(state, id_post));
   const userProfile = useSelector((state: RootState) => state.auth.dataProfile);

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
      refetch: refetchComments,
   } = useInfiniteQuery({
      queryKey: [`dataCommentPost-${id_post}`],
      queryFn: ({ pageParam = pageParams }) =>
         getComments(id_post, pageParam).then((res) => {
            setCommentsCount(res.data.count);
            if (res.data.next) {
               setNextPageParams((prev) => prev && prev + 1);
            } else {
               setNextPageParams(undefined);
            }

            // Set comment state based on whether the user has comment at least one item

            return res.data.results;
         }),
      enabled: fetching,
      getNextPageParam(lastPage, page) {
         if (pageParams) return pageParams;
         return undefined;
      },
   });

   useEffect(() => {
      if (dataComments) {
         setFetching(false);
      }

      const fetchData = async () => {
         await dispatch(FetchLikePost({ id_post }));
         const hasLiked =
            liker.length > 0 ? liker.some((item: LikerPost) => item.user === dataUser?.id) : false;
         setLiked(hasLiked);
      };
      fetchData();
   }, [dataComments, dispatch]);

   const newComments = async () => {
      if (comment.trim() === "") return;

      const body = {
         comment: comment,
      };

      const data = await createComments(body, id_post);

      if (data.status === 201) {
         setComment("");
         toast.success("Post successfully!", {
            position: "bottom-left",
            autoClose: 1500,
            theme: "dark",
         });
         return refetchComments();
      }
   };

   const handleKeyDown = (e: any) => {
      if (e.key === "Enter" && e.shiftKey === false) {
         return newComments();
      }
   };

   const handleLike = async () => {
      if (liked) {
         const res = await unlikePost(id_post);
         if (res.status === 200) {
            setLiked(false);
         } else {
            setLiked(true);
         }
         return dispatch(FetchLikePost({ id_post }));
      } else {
         const res = await likePost(id_post);

         if (res.status === 200) {
            setLiked(true);
         } else {
            setLiked(false);
         }
         return dispatch(FetchLikePost({ id_post }));
      }
   };

   return (
      <div id="content-section" className="rounded-md p-2 mb-4 bg-white dark:bg-dark ">
         <div id="creator-section" className=" flex ml-1 p-2">
            <div className="basis-10">
               <div className="avatar ">
                  <div className="w-12 mask mask-squircle">
                     <img
                        src={
                           !!author.profile_image
                              ? `${REACT_APP_BASE_URL}/api${author?.profile_image}`
                              : `https://ui-avatars.com/api/?name=${author?.username}`
                        }
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

            <div className="flex mt-1 justify-center">
               {images.length > 1 &&
                  images.map((item, i) => {
                     return (
                        <span
                           key={i}
                           className={`w-2 mx-1 h-2 rounded-full ${
                              i === index ? "bg-teal" : "bg-[#bbb] dark:bg-darker"
                           }`}
                        ></span>
                     );
                  })}
            </div>

            <div id="content-hits" className="w-full flex my-2">
               <label className="btn btn-sm swap swap-rotate text-xl bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker">
                  {/* this hidden checkbox controls the state */}
                  <input type="checkbox" checked={liked} onChange={handleLike} />

                  <div className="swap-on fill-current">
                     <HeartFilled className=" text-red text-[22px] pb-2" />
                     <span className="normal-case text-xs ml-2 ">
                        {liker.length > 0 && liker.length}
                     </span>
                  </div>
                  <div className="swap-off fill-current">
                     <HeartOutlined className=" text-teal text-[22px] pb-2" />
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
                  <span className="normal-case text-xs mb-[4px]">
                     {commentsCount > 0 && commentsCount}
                  </span>
               </button>
               <button
                  tabIndex={0}
                  className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1"
               >
                  <ShareAltOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs mb-[4px]">289k</span>
               </button>
            </div>

            <CommentsSection
               id_post={id_post}
               dataComments={dataComments}
               commentsCount={commentsCount}
               fetchNextPage={fetchNextPage}
               hasNextPage={hasNextPage}
            />

            <div className="comment-section bg-lessWhite  dark:bg-darker py-1 px-2 rounded-xl mt-2">
               <div className="comment flex space-x-4 items-start mt-2">
                  <div className="avatar">
                     <div className="w-12 mask mask-squircle">
                        <img
                           src={
                              !!userProfile.profile_image
                                 ? `${REACT_APP_BASE_URL}/api${userProfile?.profile_image}`
                                 : `https://ui-avatars.com/api/?name=${dataUser?.username}`
                           }
                           alt="Tailwind-CSS-Avatar-component"
                        />
                     </div>
                  </div>
                  <div className="comment-content pb-2 w-full">
                     <div className="social-icons flex space-x-2 items-center justify-between ">
                        {/* Ikon-ikon Media Sosial */}
                        <textarea
                           className={` textarea textarea-sm leading-normal dark:text-light w-full focus:outline-none bg-lessWhite dark:bg-dark h-full `}
                           placeholder="Comment..."
                           name="comment"
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                           onKeyDown={handleKeyDown}
                        />
                        <div className="self-start">
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
            </div>
         </div>
      </div>
   );
};
