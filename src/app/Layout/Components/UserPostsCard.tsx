import { HeartFilled, HeartOutlined, MessageOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React, { useCallback, useEffect, useState } from "react";
import { Post } from "../../../pages/Dashboard";
import { getComments, likePost, unlikePost } from "../../../services/post";
import { FetchLikePost } from "../../../redux/reducers/posts/PostsThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, selectLikerByPostId } from "../../../redux/store";
import { LikerPost } from "../../types/_postTypes";
import { useAuth } from "../../auth/core/AuthProvider";
import { UserData } from "../../auth/core/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const { REACT_APP_BASE_URL } = process.env;

interface CardPost {
   item: Post;
}

const UserPostsCard = ({ item }: CardPost) => {
   const dispatch = useDispatch<AppDispatch>();
   const { dataUser } = useAuth();
   const { id_post } = item;
   const liker = useSelector((state: RootState) => selectLikerByPostId(state, id_post));
   const [pageParams, setNextPageParams] = useState<number | undefined>(1);
   const [fetching, setFetching] = useState<boolean>(true);
   const [commentsCount, setCommentsCount] = useState<number>(0);
   const [liked, setLiked] = useState<boolean>(false);

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
      const fetchData = async () => {
         await dispatch(FetchLikePost({ id_post }));
         const hasLiked =
            liker.length > 0 ? liker.some((item: LikerPost) => item.user === dataUser?.id) : false;
         setLiked(hasLiked);
      };

      if (dataComments) {
         setFetching(false);
      }

      fetchData();
   }, [dispatch, dataComments, dataUser]);

   const handleLike = async () => {
      if (liked) {
         const res = await unlikePost(item.id_post);
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
      <Card isFooterBlurred className="rounded-sm overflow-hidden">
         <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full object-cover rounded-[2px]"
            src={`${REACT_APP_BASE_URL}/api` + item.images[0].image}
            onErrorCapture={(e: any) => (e.target.src = "/broken_img.jpg")}
         />
         <CardFooter className="absolute bg-white/20 bottom-0 flex flex-col z-10 justify-between pb-0 rounded-sm ">
            <div className="text-start text-darker w-full">
               <p className="text-sm normal-case">{item.content}</p>
            </div>
            <div id="content-hits" className="w-full flex my-2 justify-between">
               <label className="btn btn-sm swap swap-rotate text-xl  border-none text-[#666] bg-transparent hover:bg-light">
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
                  className="btn  border-none text-[#666] bg-transparent hover:bg-light btn-sm mx-1"
               >
                  <MessageOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs mb-[4px]">
                     {commentsCount > 0 && commentsCount}
                  </span>
               </button>
               <button
                  tabIndex={0}
                  className="btn  border-none text-[#666] bg-transparent hover:bg-light btn-sm mx-1"
               >
                  <ShareAltOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs mb-[4px]">289k</span>
               </button>
            </div>
         </CardFooter>
      </Card>
   );
};

export default UserPostsCard;
