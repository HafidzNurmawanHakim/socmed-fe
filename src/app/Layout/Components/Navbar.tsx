import { useNavigate } from "react-router";
import {
	MemoDarkMode,
	MemoLightMode,
	MemoMenu,
	MemoNotif,
	MemoSearch,
} from "../../../assets";
import { useAppController } from "../core/AppController";
import { useTheme } from "../core/ThemeProvider";
import LeftPanel from "./LeftPanel";
import { useAuth } from "../../auth/core/AuthProvider";
import { getCurrentMediaQuery } from "../../helper/helper";

const { REACT_APP_BASE_URL } = process.env;

export function Navbar() {
	const { setOpenPanel, openPanel } = useAppController();
	const { dataUser, dataUserProfile, follower, following } = useAuth();
	const { isDarkTheme, themeToggle } = useTheme();
	const navigate = useNavigate();
	const currentMediaQuery = getCurrentMediaQuery();

	return (
		<div id="navbar" className="mr-2 mt-2 sticky top-0 z-10">
			<div className={`navbar bg-white dark:bg-darker rounded-xl `}>
				<div className="navbar-start">
					<div className="dropdown dropdown-start">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle"
							onClick={() =>
								currentMediaQuery === "sm" ||
								currentMediaQuery === "md" ||
								currentMediaQuery === "xl" ||
								currentMediaQuery === "lg"
									? setOpenPanel(true)
									: setOpenPanel(!openPanel)
							}
						>
							<MemoMenu fontSize={26} strokeWidth={2} stroke="teal" />
						</label>
						<ul
							tabIndex={0}
							className="xl:hidden 2xl:hidden 3xl:hidden menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-darker rounded-md w-96"
						>
							<div>
								<div className="w-full h-full backdrop-blur-[6px]">
									<div className={`avatar block pt-4 mx-auto visible`}>
										<div
											className="w-20 mask mask-squircle mx-auto cursor-pointer"
											onClick={() => navigate(`profile/${dataUser?.id}`)}
										>
											<img
												src={`${REACT_APP_BASE_URL}/api${dataUserProfile?.profile_image}`}
												alt="Special Avatar"
											/>
										</div>
									</div>

									<h3 className="text-white text-center mt-2 text-sm">
										{dataUser?.first_name.toUpperCase() + " " + dataUser?.last_name.toUpperCase()}
									</h3>
									<p className="text-white text-center text-xs">@{dataUser?.username}</p>

									<div className={`flex mt-3 ${openPanel ? "block" : "hidden"}`}>
										<div className="basis-1/3 text-center text-white">
											<div>{follower.length}</div>
											<div className="text-xs">Follower</div>
										</div>
										<div className="divider divider-horizontal "></div>

										<div className="basis-1/3 text-center text-white">
											<div>932k</div>
											<div className="text-xs">Hits</div>
										</div>
										<div className="divider divider-horizontal "></div>

										<div className="basis-1/3 text-center text-white">
											<div>{following?.length}</div>
											<div className="text-xs">Following</div>
										</div>
									</div>

									<p className="text-white text-center text-xs mt-2 italic">
										"{dataUserProfile?.bio}"
									</p>
								</div>
							</div>
						</ul>
					</div>
				</div>
				<div className="navbar-center hidden lg:block">
					<div className="join">
						<input
							className="input focus:outline-none rounded-s-full bg-lessWhite dark:bg-dark join-item "
							placeholder="Search something..."
						/>
						<button className="btn join-item bg-lessWhite border-none dark:bg-dark rounded-r-full">
							<MemoSearch fontSize={26} strokeWidth={2} stroke="teal" />
						</button>
					</div>
				</div>
				<div className="navbar-end">
					<button className="btn btn-ghost btn-circle" onClick={() => themeToggle()}>
						{isDarkTheme ? (
							<MemoDarkMode fontSize={26} strokeWidth={2} fill="#00ADB5" />
						) : (
							<MemoLightMode fontSize={26} strokeWidth={2} fill="#00ADB5" />
						)}
					</button>
					<button className="btn btn-ghost btn-circle">
						<div className="indicator">
							<MemoNotif fontSize={26} strokeWidth={2} stroke="teal" />
							<span className="badge badge-xs badge-primary indicator-item"></span>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
