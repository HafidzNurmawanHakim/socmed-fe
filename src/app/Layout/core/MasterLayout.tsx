import { Navbar } from "../Components/Navbar";
import LeftPanel from "../Components/LeftPanel";
import ContentCreator from "../Components/ContentCreator";
import { ContentSection, ImageObj } from "../Components/ContentSection";
import RightPanel from "../Components/RightPanel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPost } from "../../../services/post";
import { Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import InfiniteScroller from "../../helper/InfinityScroller";
import { UserData } from "../../auth/core/types";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
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
							<Outlet />
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
