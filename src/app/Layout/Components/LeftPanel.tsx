import { useState, useEffect } from "react";
import { MemoCoffee, MemoHome, MemoImage } from "../../../assets";
import MemoPerson from "./Person";
import { useAppController } from "../core/AppController";
import {
   HomeOutlined,
   LogoutOutlined,
   PictureOutlined,
   SettingOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../auth/core/AuthProvider";
import { useNavigate } from "react-router-dom";

const { REACT_APP_BASE_URL } = process.env;

interface MenuProps {
   title: string;
   icon: React.JSX.Element;
   to: string;
}

export default function LeftPanel() {
   const { openPanel } = useAppController();
   const { dataUser, dataUserProfile, follower, following } = useAuth();
   const navigate = useNavigate();

   const openModal = () => {
      const modal: any = document.getElementById("logout_modal");
      if (!modal) return;
      return modal.showModal();
   };

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return window.location.reload();
   };

   return (
      <>
         {/* Open the modal using document.getElementById('ID').showModal() method */}
         <dialog id="logout_modal" className="modal">
            <div className="modal-box">
               <p className="py-4 text-dark dark:text-light">Apakah Anda yakin ingin logout?</p>
               <div className="modal-action">
                  <button className="btn btn-sm normal-case font-normal" onClick={logout}>
                     Logout
                  </button>

                  <form method="dialog">
                     {/* if there is a button in form, it will close the modal */}
                     <button className="btn btn-sm normal-case font-normal bg-teal text-dark hover:text-light">
                        Close
                     </button>
                  </form>
               </div>
            </div>
            <form method="dialog" className="modal-backdrop">
               <button>close</button>
            </form>
         </dialog>
         <div
            id="left-panel"
            className={`bg-white dark:bg-darker hidden xl:block dark:bg-darker rounded-xl m-2 transition-all duration-300 relative  ${
               openPanel
                  ? "basis-1/5 lg:basis-1/4  xl:basis-2/8 2xl:basis-3/8 3xl:basis-1/5"
                  : "basis-24"
            } `}
         >
            <div className="h-16 pt-2 mb-2">
               {/* <button className={`btn btn-ghost ${openPanel ? "ml-4" : "ml-1"}`}>
                  <MemoCoffee fontSize={22} fill="#00ADB5" />
                  <span className={`normal-case  ${openPanel ? "visible" : "invisible"}`}>
                     Coffee
                  </span>
               </button> */}
            </div>

            <div
               className={`rounded-lg w-full custom-transition overflow-hidden relative transition-all duration-300 ${
                  openPanel ? "h-60" : "h-24 invisible"
               }`}
            >
               <div
                  className={`absolute top-0 left-0 w-full h-full bg-top pl-[1px] gradient mx-auto `}
                  style={{
                     backgroundImage: `url(${REACT_APP_BASE_URL}/api${dataUserProfile?.profile_image})`,
                  }}
               ></div>
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

            {/* <div
					className={`rounded-lg w-[95%] mx-auto overflow-hidden relative ${
						openPanel ? "h-52" : "h-24"
					}`}
				>
					<div
						className={`${
							openPanel ? "h-full w-full" : "h-0 w-0"
						} custom-transition blur-sm border-none absolute z-0 `}
						style={{
							backgroundImage: `url('/images/bg-anim.jpg')`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					></div>
					<div className="w-full h-full absolute z-10">
						<div className="flex flex-col">
							<div className="basis-1/2 py-4 pb-2">
								<img
									src="https://api.multiavatar.com/Binx Bond.png"
									alt="Background"
									className="rounded-full mx-auto w-[72px] h-[72px]"
								/>
							</div>
							<div className="basis-1/2  p-2 pt-0">
								<div className={`text-center ${openPanel ? "block" : "hidden"} `}>
									<div className="mb-0 text-white ">
										{dataUser?.first_name.toUpperCase() + " " + dataUser?.last_name.toUpperCase()}
									</div>
									<div className="text-xs space-y-0 mb-1 text-white">@{dataUser?.username}</div>
								</div>
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
							</div>
						</div>
					</div>
				</div> */}

            <ul className="menu w-[85%]  ml-2 bg-white dark:bg-darker rounded-box mt-6">
               <div className="ml-2 text-white">Menu</div>
               {menu.map((item: MenuProps, i) => {
                  return (
                     <li key={i + item.title} className="custom-transition ">
                        <a
                           className={`custom-transition   ${openPanel ? "" : "tooltip"}`}
                           data-tip={item.title}
                           href={item.to === "/profile" ? `/profile/${dataUser?.id}` : item.to}
                        >
                           {item.icon}
                           <span
                              className={`custom-transition text-teal ml-4 ${
                                 openPanel ? "" : "hidden"
                              }`}
                           >
                              {item.title}
                           </span>
                        </a>
                     </li>
                  );
               })}
            </ul>
            <div className={`absolute bottom-4 w-5/6 ${openPanel ? "left-6 " : "left-2"}`}>
               <button
                  className={`btn custom-transition hover:text-teal hover:bg-lessLight dark:hover:bg-dark hover:border-darker bg-lessWhite dark:bg-dark border-none normal-case w-full ${
                     openPanel ? "btn-sm" : "btn-circle "
                  }`}
                  onClick={openModal}
               >
                  {openPanel && "Logout"}
                  <LogoutOutlined className="text-teal custom-transition text-lg " />
               </button>
            </div>
         </div>
      </>
   );
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
