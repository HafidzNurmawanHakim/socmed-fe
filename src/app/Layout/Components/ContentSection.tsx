import React, { useState } from "react";
import { MemoLoc } from "../../../assets";
import MemoTripleDot from "../../../assets/Svg/TripleDot";
import MemoReply from "../../../assets/Svg/Reply";
import MemoHeart from "../../../assets/Svg/Heart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
   CaretLeftOutlined,
   CaretRightOutlined,
   MessageOutlined,
   ShareAltOutlined,
   ThunderboltFilled,
} from "@ant-design/icons";
import { UserData } from "../../auth/core/types";
import { formatTagsInText } from "../../helper/helper";
import Slider from "react-slick";

const { REACT_APP_BASE_URL } = process.env;

export type ImageObj = {
   image: string;
};

type Content = {
   content: string;
   created_at: string;
   updated_at: string;
   author: UserData;
   id: number;
   images: Array<ImageObj>;
};

interface ContentSectionProps {
   data: Content;
}

export const ContentSection = (props: ContentSectionProps) => {
   const { content, created_at, updated_at, author, id, images } = props.data;
   const [currentSlide, setCurrentSlide] = useState<number>(0);

   const nextHandle = (e: any) => {
      // e.preventDefault();
      if (currentSlide < images.length - 1) {
         setCurrentSlide((prev) => prev + 1);
      } else {
         setCurrentSlide(0);
      }
   };

   const prevHandle = (e: any) => {
      // e.preventDefault();
      if (currentSlide > 0) {
         setCurrentSlide((prev) => prev - 1);
      } else {
         setCurrentSlide(images.length - 1);
      }
   };

   function SampleNextArrow(props: any) {
      const { className, style, onClick } = props;
      return (
         <div
            className="btn btn-sm btn-circle py-[5px] items-center absolute top-[50%] right-[0] mr-4"
            style={{ ...style }}
            onClick={onClick}
         >
            <CaretRightOutlined />
         </div>
      );
   }
   function SamplePrevArrow(props: any) {
      const { className, style, onClick } = props;
      return (
         <div
            className="btn btn-sm btn-circle py-[5px] absolute top-[50%] z-10 ml-4"
            style={{ ...style }}
            onClick={onClick}
         >
            <CaretLeftOutlined />
         </div>
      );
   }

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
   };

   return (
      <div id="content-section" className="rounded-md p-2 mb-4 bg-white dark:bg-dark ">
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
            <div id="text-content">
               <p className="indent-2 text-dark dark:text-light text-sm">
                  {formatTagsInText(content)}
               </p>
               <div id="tags-content">#test</div>
            </div>
            <div id="image-content" className=" ">
               {images.length > 0 ? (
                  <Slider {...settings} className="">
                     {images.map((item, i) => {
                        let imageName = item.image.split("/")[item.image.split("/").length - 1];
                        return (
                           <img
                              key={imageName + i}
                              src={`${REACT_APP_BASE_URL}/api` + item.image}
                              alt={imageName}
                              className="rounded-sm"
                           />
                        );
                     })}
                  </Slider>
               ) : (
                  <></>
               )}
               {/* {images.length > 0 &&
                  images.map((item, i) => {
                     let imageName = item.image.split("/")[item.image.split("/").length - 1];
                     return (
                        <img
                           key={imageName + i}
                           src={`${REACT_APP_BASE_URL}/api` + item.image}
                           alt={imageName}
                           className="rounded-sm"
                        />
                     );
                  })} */}
            </div>

            <div className="divider my-0"></div>

            <div id="content-hits" className="w-full  flex mb-2">
               <button
                  tabIndex={0}
                  className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1 "
               >
                  <MemoHeart
                     fontSize={28}
                     fill="#ED2B2A"
                     strokeWidth={2}
                     className="material-symbols-outlined"
                  />
                  <span className="normal-case text-xs">289k</span>
               </button>
               <button
                  tabIndex={0}
                  className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1"
               >
                  <MessageOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs">289k</span>
               </button>
               <button
                  tabIndex={0}
                  className="btn bg-white border-none text-[#666] hover:bg-lessLight dark:bg-dark dark:hover:bg-darker btn-sm mx-1"
               >
                  <ShareAltOutlined className="text-teal mb-1 text-xl" />
                  <span className="normal-case text-xs">289k</span>
               </button>
            </div>

            <div className="comment-section bg-lessWhite  dark:bg-darker py-1 px-2 rounded-xl">
               <div className="comment flex space-x-4 items-start">
                  <div className="avatar mt-1">
                     <div className="w-10 rounded bg-teal">
                        <img
                           src="https://api.multiavatar.com/Binx Bond.png"
                           alt="Tailwind-CSS-Avatar-component"
                        />
                     </div>
                  </div>
                  <div className="comment-content flex-1 pb-2">
                     <p className="text-dark dark:text-white ">Sukirman</p>
                     <div className="social-icons flex space-x-2 items-center justify-between">
                        {/* Ikon-ikon Media Sosial */}
                        <p className="text-sm text-dark dark:text-light ">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis in
                        </p>
                        <div className="flex">
                           <a href="#" className="">
                              <button
                                 tabIndex={0}
                                 className="btn btn-sm bg-lessLight dark:bg-dark border-none hover:bg-white mx-1"
                              >
                                 <ThunderboltFilled className="text-warning mb-1 text-xl" />
                              </button>
                           </a>
                           <a href="#" className="">
                              <button
                                 tabIndex={0}
                                 className="btn btn-sm bg-lessLight dark:bg-dark border-none hover:bg-white mx-1"
                              >
                                 <MemoReply fill="teal" className="text-teal mb-1 text-xl" />
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
