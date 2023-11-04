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
import { UserData } from "../../auth/core/types";
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
import CommentsSection from "./CommentsSection";

export type ImageObj = {
	image: string;
};

type Content = {
	content: string;
	created_at: string;
	updated_at: string;
	author: UserData;
	id_post: number;
	images: Array<ImageObj>;
};

interface ContentSectionProps {
	data: Content;
}

type LikePost = {
	like_id: number;
	created_at: string;
	updated_at: string;
	user: number;
	post: number;
};

export const ContentSection = (props: ContentSectionProps) => {
	const { content, created_at, updated_at, author, id_post, images } = props.data;
	const { dataUser } = useAuth();
	const [index, setIndex] = useState<number>(0);
	const [comment, setComment] = useState("");
	const [allComments, setAllComments] = useState([]);
	const [fetching, setFetching] = useState<boolean>(true);
	const [pageParams, setNextPageParams] = useState<number | undefined>(1);
	const [liked, setLiked] = useState<boolean>(false);
	const [liker, setLiker] = useState<UserData[]>([]);
	const [commentsCount, setCommentsCount] = useState<number>(0);

	const getLike = async () => {
		const res = await getLikePost(id_post);

		if (res.status === 200) {
			// Check if the user has liked at least one item in res.data
			const hasLiked = res.data.some((item: LikePost) => item.user === dataUser?.id);

			setLiked(hasLiked); // Set liked state based on whether the user has liked at least one item

			setLiker(res.data);
		} else {
			setLiker([]);
		}
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
			return getLike();
		} else {
			const body = { post: id_post };
			const res = await likePost(body);

			if (res.status === 200) {
				setLiked(true);
			} else {
				setLiked(false);
			}
			return getLike();
		}
	};

	return (
		<div
			id="content-section"
			className="rounded-md p-2 mb-4 bg-white dark:bg-dark "
		>
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
						<span className="normal-case text-xs">
							{commentsCount > 0 && commentsCount}
						</span>
					</button>
					<button
						tabIndex={0}
						className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1"
					>
						<ShareAltOutlined className="text-teal mb-1 text-xl" />
						<span className="normal-case text-xs">289k</span>
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
							<div className="w-12 rounded ">
								<img
									src="https://api.multiavatar.com/Binx Bond.png"
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
					{/* Tambahkan lebih banyak komentar di sini */}
				</div>
			</div>
		</div>
	);
};
