import React, { useEffect, useState } from "react";
import { useAuth } from "../app/auth/core/AuthProvider";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Image,
	Skeleton,
	Tab,
	Tabs,
} from "@nextui-org/react";
import {
	FormOutlined,
	HeartFilled,
	HeartOutlined,
	MessageOutlined,
	PictureOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FetchFollower, FetchProfile } from "../redux/reducers/auth/AuthThunk";
import { AppDispatch, RootState } from "../redux/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/post";
import { Post } from "./Dashboard";
import InfiniteScroller from "../app/helper/InfinityScroller";
import { CardSkeleton } from "../app/Layout/Components/Skeleton";

const { REACT_APP_BASE_URL } = process.env;

const Profile = () => {
	const { dataUser } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const userProfile = useSelector((state: RootState) => state.auth.dataProfile);
	const userFollower = useSelector((state: RootState) => state.auth.follower);
	const userFollowing = useSelector((state: RootState) => state.auth.following);
	const getProfileStatus = useSelector(
		(state: RootState) => state.auth.getStatus
	);
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
		queryKey: ["dataUserPosts"],
		queryFn: ({ pageParam = pageParams }) =>
			getUserPosts(pageParam).then((res) => {
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
		dispatch(FetchProfile());
		dispatch(FetchFollower());
	}, [dispatch]);

	return (
		<>
			<div className="mt-2 mr-2">
				{getProfileStatus !== "loading" ? (
					<div className="bg-white dark:bg-darker rounded-md ">
						<div className="w-full flex flex-col lg:flex-row xl:flex-row h-fit xl:h-80  rounded-md ">
							<div className="w-full xl:w-2/5 text-white h-full relative rounded-l-md overflow-hidden ">
								<div
									className="w-full h-full bg-top bg-no-repeat rounded-md overflow-hidden bg-cover gradient 3xl:gradient-to-right xl:gradient-to-right absolute"
									style={{
										backgroundImage: `url(${REACT_APP_BASE_URL}/api${userProfile?.profile_image})`,
									}}
								></div>
								<div className="w-full h-full backdrop-blur-[8px]">
									<div className="avatar block py-5 mx-auto">
										<div className="w-28 mask mask-squircle mx-auto">
											<img
												src={`${REACT_APP_BASE_URL}/api${userProfile?.profile_image}`}
												alt="Special Avatar"
											/>
										</div>
									</div>
									<div className="w-full">
										<h3 className="text-center">
											{dataUser?.first_name.toUpperCase() + " " + dataUser?.last_name.toUpperCase()}
										</h3>
										<p className="text-center text-xs">@{dataUser?.username}</p>
									</div>
								</div>
							</div>

							<div className="flex-initial w-3/5 xs:w-full 2xl:pl-8 pt-4 flex flex-col justify-between">
								<div id="stat" className="block w-fit mx-auto">
									<div className="stats xs:max-lg:stats-horizontal bg-lessWhite dark:bg-darker text-teal">
										<div className="stat place-items-center">
											<div className="stat-title dark:text-light text-teal">Follower</div>
											<div className="stat-value text-lg lg:text-2xl 2xl:text-3xl">
												{userFollower.length}
											</div>
											<div className="stat-desc">Jan 1st - Feb 1st</div>
										</div>

										<div className="stat place-items-center">
											<div className="stat-title dark:text-light text-teal">Hits</div>
											<div className="stat-value text-lg lg:text-2xl 2xl:text-3xl">4,200</div>
											<div className="stat-desc">↗︎ 400 (22%)</div>
										</div>

										<div className="stat place-items-center">
											<div className="stat-title dark:text-light text-teal">Following</div>
											<div className="stat-value text-lg lg:text-2xl 2xl:text-3xl">
												{userFollowing.length}
											</div>
											<div className="stat-desc">↘︎ 90 (14%)</div>
										</div>
									</div>
								</div>

								<div className="text-end mb-2 mr-2 w-full">
									<button
										className="btn btn-ghost btn-circle"
										onClick={() => navigate(`/profile/edit/${dataUser?.id}`)}
									>
										<div className="indicator">
											<FormOutlined className="text-teal text-lg" />
											<span className="badge badge-xs badge-primary indicator-item"></span>
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="bg-white dark:bg-darker rounded-md ">
						<div className="w-full flex flex-col xl:flex-row h-fit xl:h-80  rounded-md ">
							<Skeleton className="rounded-lg">
								<div className=" rounded-lg bg-secondary"></div>
							</Skeleton>
						</div>
					</div>
				)}

				<div className="flex w-full flex-col mt-2">
					<Tabs aria-label="Options" color="default" variant="light" radius="sm">
						<Tab
							key="posts"
							title={
								<div className="flex items-center space-x-2 ">
									<PictureOutlined className="text-xl dark:text-light" />
									<span className="dark:text-white">Posts</span>
								</div>
							}
						>
							<Card className="shadow-none dark:bg-darker rounded-md" shadow="none">
								<InfiniteScroller hasMore={hasNextPage} loadMore={fetchNextPage}>
									{!isLoading ? (
										<CardBody className="grid grid-cols-3 gap-1">
											{data?.pages.map((items: Post[], i) => {
												return items.map((item: Post, i) => {
													return (
														<Card isFooterBlurred className="rounded-sm overflow-hidden">
															<Image
																removeWrapper
																alt="Card example background"
																className="z-0 w-full h-full  object-cover rounded-[2px]"
																src={`${REACT_APP_BASE_URL}/api` + item.images[0].image}
															/>
															<CardFooter className="absolute bg-white/20 bottom-0 flex flex-col z-10 justify-between pb-0 rounded-sm ">
																<div className="text-start text-darker w-full">
																	<p className="text-sm normal-case">{item.content}</p>
																</div>
																<div id="content-hits" className="w-full flex my-2 justify-between">
																	<label className="btn btn-sm swap swap-rotate text-xl  border-none text-[#666] bg-transparent hover:bg-light">
																		{/* this hidden checkbox controls the state */}
																		<input type="checkbox" checked={true} />

																		<div className="swap-on fill-current">
																			<HeartFilled className=" text-red text-[22px] pb-2" />
																			<span className="normal-case text-xs ml-2 ">
																				{/* {liker.length > 0 && liker.length} */} 0
																			</span>
																		</div>
																		<div className="swap-off fill-current">
																			<HeartOutlined className=" text-teal text-[22px] pb-2" />
																			<span className="normal-case text-xs ml-2">
																				{/* {liker.length > 0 && liker.length} */} 0
																			</span>
																		</div>
																	</label>
																	<button
																		tabIndex={0}
																		className="btn  border-none text-[#666] bg-transparent hover:bg-light btn-sm mx-1"
																	>
																		<MessageOutlined className="text-teal mb-1 text-xl" />
																		<span className="normal-case text-xs mb-[4px]">
																			{/* {commentsCount > 0 && commentsCount} */}0
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
												});
											})}
										</CardBody>
									) : (
										<CardSkeleton />
									)}
								</InfiniteScroller>
							</Card>
						</Tab>
						<Tab
							key="music"
							title={
								<div className="flex items-center space-x-2">
									<PictureOutlined className="text-xl dark:text-light" />

									<span className="dark:text-white">Music</span>
								</div>
							}
						/>
						<Tab
							key="videos"
							title={
								<div className="flex items-center space-x-2">
									<PictureOutlined className="text-xl dark:text-light" />
									<span className="dark:text-white">Videos</span>
								</div>
							}
						/>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default Profile;
