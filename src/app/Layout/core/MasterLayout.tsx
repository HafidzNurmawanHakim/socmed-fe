import { Navbar } from "../Components/Navbar";
import LeftPanel from "../Components/LeftPanel";
import ContentCreator from "../Components/ContentCreator";
import { ContentSection } from "../Components/ContentSection";
import RightPanel from "../Components/RightPanel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPost } from "../../../services/post";
import { Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import InfiniteScroller from "../../helper/InfinityScroller";
import { UserData } from "../../auth/core/types";

export type Post = {
   content: string;
   created_at: string;
   updated_at: string;
   author: UserData;
   images: string[];
   id: number;
};

export default function MasterLayout() {
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
      <>
         <div className="flex h-full w-screen bg-lessWhite dark:bg-dark">
            <LeftPanel />

            <div className="bg-lessWhite basis-auto dark:bg-dark w-full ">
               <div className="flex">
                  <div
                     id="main-section"
                     className="basis-full bg-lessWhite dark:bg-dark md:3/6 xl:basis-4/6 2xl:basis-5/8 max-h-screen  max-w-full overflow-y-auto scrollbar  overflow-x-hidden"
                  >
                     <Navbar />
                     <div className="mt-2 mr-2 ">
                        <div className="bg-white dark:bg-darker rounded-md py-4 px-2 xl:px-20">
                           <div className="border bg-lessWhite dark:bg-darker border-none dark:border-darker 2xl:p-6 rounded-md shadow-md">
                              <ContentCreator />
                              {isLoading ? (
                                 <div className="flex justify-center py-4">
                                    <Spinner />
                                 </div>
                              ) : (
                                 <InfiniteScroller hasMore={hasNextPage} loadMore={fetchNextPage}>
                                    {data?.pages.map((item: Post[], i: number) => {
                                       return item.map((items: Post) => {
                                          return (
                                             <ContentSection
                                                key={i + items.created_at}
                                                data={items}
                                             />
                                          );
                                       });
                                    })}
                                 </InfiniteScroller>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="hidden md:block md:basis-3/6 xl:basis-2/6 2xl:basis-3/8  max-h-screen w-full">
                     <RightPanel />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
