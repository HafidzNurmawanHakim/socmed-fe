import { Navbar } from "../Components/Navbar";
import LeftPanel from "../Components/LeftPanel";
import ContentCreator from "../Components/ContentCreator";
import { ContentSection } from "../Components/ContentSection";
import RightPanel from "../Components/RightPanel";

export default function MasterLayout() {
	return (
		<>
			<div className="flex h-full w-screen bg-dark">
				<LeftPanel />

				<div className="bg-lessWhite basis-auto dark:bg-dark w-full ">
					<div className="flex">
						<div
							id="main-section"
							className="basis-full md:3/6 xl:basis-4/6 2xl:basis-5/8 max-h-screen max-w-full overflow-y-auto scrollbar  overflow-x-hidden"
						>
							<Navbar />
							<div className="mt-2 mr-2">
								<div className="bg-darker rounded-md py-4 px-2 xl:px-20">
									<div className="border border-dark 2xl:p-6 rounded-md shadow-md">
										<ContentCreator />
										<ContentSection />
										<ContentSection />
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
