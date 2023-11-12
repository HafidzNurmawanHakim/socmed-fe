import React from "react";
import { useAuth } from "../app/auth/core/AuthProvider";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { PictureOutlined } from "@ant-design/icons";

const { REACT_APP_BASE_URL } = process.env;

const Profile = () => {
   const { dataUser, dataUserProfile, follower, following } = useAuth();
   return (
      <>
         <div className="mt-2 mr-2">
            <div className="bg-white dark:bg-darker rounded-md ">
               <div className="w-full flex flex-col xl:flex-row h-fit xl:h-80  rounded-md ">
                  <div className="w-full xl:w-2/5 text-white h-full relative rounded-l-md overflow-hidden">
                     <div
                        className="w-full h-full bg-top bg-no-repeat rounded-md overflow-hidden bg-cover gradient 3xl:gradient-to-right absolute"
                        style={{
                           backgroundImage: `url(${REACT_APP_BASE_URL}/api${dataUserProfile?.profile_image})`,
                        }}
                     ></div>
                     <div className="w-full h-full backdrop-blur-[8px]">
                        <div className="avatar block py-5 mx-auto">
                           <div className="w-28 mask mask-squircle mx-auto">
                              <img
                                 src={`${REACT_APP_BASE_URL}/api${dataUserProfile?.profile_image}`}
                                 alt="Special Avatar"
                              />
                           </div>
                        </div>
                        <div className="w-full">
                           <h3 className="text-center">
                              {dataUser?.first_name.toUpperCase() +
                                 " " +
                                 dataUser?.last_name.toUpperCase()}
                           </h3>
                           <p className="text-center text-xs">@{dataUser?.username}</p>
                        </div>
                     </div>
                  </div>
                  <div className="flex-initial w-3/5 2xl:pl-8 pt-4">
                     <div id="stat" className="block w-fit mx-auto">
                        <div className="stats md:stats-vertical sm:stats-horizontal xl:stats-horizontal dark:bg-darker">
                           <div className="stat place-items-center">
                              <div className="stat-title">Follower</div>
                              <div className="stat-value text-lg lg:text-2xl 2xl:text-3xl">
                                 {follower.length}
                              </div>
                              <div className="stat-desc">Jan 1st - Feb 1st</div>
                           </div>

                           <div className="stat place-items-center">
                              <div className="stat-title">Hits</div>
                              <div className="stat-value text-lg lg:text-2xl 2xl:text-3xl">
                                 4,200
                              </div>
                              <div className="stat-desc">↗︎ 400 (22%)</div>
                           </div>

                           <div className="stat place-items-center">
                              <div className="stat-title">Following</div>
                              <div className="stat-value text-lg lg:text-2xl 2xl:text-3xl">
                                 {following.length}
                              </div>
                              <div className="stat-desc">↘︎ 90 (14%)</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

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
                     <Card className=" shadow-none dark:bg-darker rounded-sm">
                        <CardBody className="= ">
                           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
                           consequatur id ab a beatae amet veniam aut iste rerum tenetur laudantium
                           in, temporibus consectetur qui doloremque autem eligendi obcaecati!
                           Temporibus aliquam veniam asperiores illo sit officiis, cupiditate harum
                           tempora amet autem culpa optio esse dicta dignissimos reprehenderit
                           consectetur alias provident, beatae fugiat? Minus suscipit corrupti sint
                           architecto modi dolore incidunt possimus adipisci commodi excepturi
                           provident voluptatem sapiente tenetur facere laudantium, repudiandae qui
                           molestiae velit doloribus cumque rem ad laboriosam sequi? Eveniet libero
                           labore modi porro, commodi odio quos animi iusto ipsum quam excepturi,
                           voluptatum nostrum ut distinctio facere qui ex.
                        </CardBody>
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
