import React, { useEffect, useState } from "react";
import ContentCreator from "../app/Layout/Components/ContentCreator";
import { Spinner } from "@nextui-org/react";
import InfiniteScroller from "../app/helper/InfinityScroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPost } from "../services/post";
import { ContentSection, ImageObj } from "../app/Layout/Components/ContentSection";
import { UserProfile } from "../app/auth/core/types";

export type Post = {
   content: string;
   created_at: string;
   updated_at: string;
   author: UserProfile;
   images: Array<ImageObj>;
   id_post: number;
};

const Dashboard = () => {
   const [fetching, setFetching] = useState<boolean>(true);
   const [pageParams, setNextPageParams] = useState<number | undefined>(1);

   const {
      data,
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
      queryKey: ["dataPost"],
      queryFn: ({ pageParam = pageParams }) =>
         getPost(pageParam).then((res) => {
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
      if (data) return setFetching(false);
   }, [data]);

   return (
      <div>
         <div className="mt-2 mr-2 xs:ml-2">
            <div className="bg-white dark:bg-darker rounded-md py-4 px-2 xl:px-20">
               <div className="border bg-lessWhite dark:bg-darker border-none dark:border-darker 2xl:p-6 rounded-md shadow-md max-w-[800px] mx-auto">
                  <ContentCreator />
                  {isLoading ? (
                     <div className="flex justify-center py-4">
                        <Spinner />
                     </div>
                  ) : (
                     <InfiniteScroller hasMore={hasNextPage} loadMore={fetchNextPage}>
                        {(data?.pages || []).length > 0 ? (
                           data?.pages.map((item: Post[], i: number) => {
                              return item.map((items: Post) => {
                                 return <ContentSection key={i + items.created_at} data={items} />;
                              });
                           })
                        ) : (
                           <div className="rounded-md p-2 mb-4 bg-white dark:bg-dark block">
                              Looks like nothing to see here!
                           </div>
                        )}
                     </InfiniteScroller>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
