import { useNavigate, NavigateFunction } from "react-router";
import { FC } from "react";
import { MemoDarkMode, MemoLightMode, MemoMenu, MemoNotif, MemoSearch } from "../../../assets";
import { useAppController } from "../core/AppController";
import { useTheme } from "../core/ThemeProvider";
import LeftPanel from "./LeftPanel";
import { useAuth } from "../../auth/core/AuthProvider";
import { getCurrentMediaQuery } from "../../helper/helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { FormUserProfile } from "../../types/_authTypes";
import { UserData } from "../../auth/core/types";
import {
   HomeOutlined,
   LogoutOutlined,
   PictureOutlined,
   SettingOutlined,
   UserOutlined,
} from "@ant-design/icons";

const { REACT_APP_BASE_URL } = process.env;

interface ProfileCardProps {
   navigate: NavigateFunction;
   userProfile: FormUserProfile;
   dataUser: UserData | null;
   userFollower: UserData[];
   userFollowing: UserData[];
}

const ProfileCard = (props: ProfileCardProps) => {
   const openModal = () => {
      const modal: any = document.getElementById("logout_modal");
      if (!modal) return;
      return modal.showModal();
   };

   return (
      <PopoverContent>
         <div>
            <div className="w-full h-full backdrop-blur-[6px]">
               <div className={`avatar block pt-4 mx-auto visible`}>
                  <div
                     className="w-20 mask mask-squircle mx-auto cursor-pointer"
                     onClick={() => props.navigate(`profile/${props.dataUser?.id}`)}
                  >
                     <img
                        src={`${REACT_APP_BASE_URL}/api${props.userProfile?.profile_image}`}
                        alt="Special Avatar"
                     />
                  </div>
               </div>

               <h3 className="text-center mt-2 text-sm text-teal dark:text-light">
                  {props.dataUser?.first_name.toUpperCase() +
                     " " +
                     props.dataUser?.last_name.toUpperCase()}
               </h3>
               <p className=" text-center text-xs text-teal dark:text-light">
                  @{props.dataUser?.username}
               </p>

               <div className={`flex mt-3`}>
                  <div className="basis-1/3 text-center text-teal dark:text-light">
                     <div>{props.userFollower.length}</div>
                     <div className="text-xs text-teal dark:text-light">Follower</div>
                  </div>
                  <div className="divider divider-horizontal "></div>

                  <div className="basis-1/3 text-center text-teal dark:text-light">
                     <div>932k</div>
                     <div className="text-xs text-teal dark:text-light">Hits</div>
                  </div>
                  <div className="divider divider-horizontal "></div>

                  <div className="basis-1/3 text-center text-teal dark:text-light">
                     <div>{props.userFollowing?.length}</div>
                     <div className="text-xs text-teal dark:text-light">Following</div>
                  </div>
               </div>

               <p className="text-teal dark:text-light text-center text-xs mt-2 italic ">
                  "{props.userProfile?.bio}"
               </p>
            </div>
            <ul className="menu w-[85%]  bg-white dark:bg-darker rounded-box mt-6">
               <div className="text-white">Menu</div>
               {menu.map((item: MenuProps, i) => {
                  return (
                     <li key={i + item.title} className="custom-transition ">
                        <a
                           className={`custom-transition  `}
                           data-tip={item.title}
                           href={
                              item.to === "/profile" ? `/profile/${props.dataUser?.id}` : item.to
                           }
                        >
                           {item.icon}
                           <span className={`custom-transition text-teal ml-4`}>{item.title}</span>
                        </a>
                     </li>
                  );
               })}
            </ul>

            <button
               className={`btn custom-transition hover:text-teal hover:bg-lessLight dark:hover:bg-dark hover:border-darker bg-lessWhite dark:bg-dark border-none normal-case w-full btn-sm mb-4`}
               onClick={openModal}
            >
               Logout
               <LogoutOutlined className="text-teal custom-transition text-lg " />
            </button>
         </div>
      </PopoverContent>
   );
};

export function Navbar() {
   const { setOpenPanel, openPanel } = useAppController();
   const { dataUser } = useAuth();
   const { isDarkTheme, themeToggle } = useTheme();
   const navigate = useNavigate();
   const currentMediaQuery = getCurrentMediaQuery();
   const userProfile = useSelector((state: RootState) => state.auth.dataProfile);
   const userFollower = useSelector((state: RootState) => state.auth.follower);
   const userFollowing = useSelector((state: RootState) => state.auth.following);

   return (
      <div id="navbar" className="mr-2 mt-2 sticky top-0 z-10">
         <div className={`navbar bg-white dark:bg-darker rounded-xl `}>
            <div className="navbar-start">
               <Popover placement={"bottom-start"}>
                  <PopoverTrigger>
                     <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle"
                        onClick={() =>
                           currentMediaQuery === "sm" ||
                           currentMediaQuery === "md" ||
                           currentMediaQuery === "xl" ||
                           currentMediaQuery === "lg"
                              ? null
                              : setOpenPanel(!openPanel)
                        }
                     >
                        <MemoMenu fontSize={26} strokeWidth={2} stroke="teal" />
                     </label>
                  </PopoverTrigger>
                  {currentMediaQuery === "sm" ||
                  currentMediaQuery === "md" ||
                  currentMediaQuery === "xl" ? (
                     <ProfileCard
                        navigate={navigate}
                        userFollower={userFollower}
                        userProfile={userProfile}
                        userFollowing={userFollowing}
                        dataUser={dataUser}
                     />
                  ) : (
                     <></>
                  )}
               </Popover>
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

interface MenuProps {
   title: string;
   icon: React.JSX.Element;
   to: string;
}

const menu: Array<MenuProps> = [
   {
      title: "Home",
      icon: <HomeOutlined className="text-teal text-xl" />,
      to: "/",
   },
   {
      title: "Profile",
      icon: <UserOutlined className="text-teal text-xl" />,
      to: `/profile`,
   },
   {
      title: "Images",
      icon: <PictureOutlined className="text-teal text-xl" />,
      to: "#",
   },
   {
      title: "Setting",
      icon: <SettingOutlined className="text-teal text-xl" />,
      to: "#",
   },
];
