import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ImageObj } from "./ContentSection";

const { REACT_APP_BASE_URL } = process.env;

interface CarouselProps {
   images: Array<ImageObj>;
   index: number;
   setIndex: Dispatch<SetStateAction<number>>;
}

export default function Carousel({ images, index, setIndex }: CarouselProps) {
   return (
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
         <div className="h-full bg-black">
            <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
               <div className="relative overflow-hidden">
                  <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
                     {images.map((item, i) => {
                        let imageName = item.image.split("/")[item.image.split("/").length - 1];
                        return (
                           <img
                              key={imageName}
                              src={`${REACT_APP_BASE_URL}/api` + item.image}
                              className="object-cover rounded-sm m-auto"
                              onError={(e: any) => (e.target.src = "/broken_img.jpg")}
                           />
                        );
                     })}
                  </motion.div>
                  <AnimatePresence initial={false}>
                     {index > 0 && (
                        <motion.button
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 0.7 }}
                           exit={{ opacity: 0, pointerEvents: "none" }}
                           whileHover={{ opacity: 1 }}
                           className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                           onClick={() => setIndex(index - 1)}
                        >
                           <CaretLeftOutlined />
                        </motion.button>
                     )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                     {index + 1 < images.length && (
                        <motion.button
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 0.7 }}
                           exit={{ opacity: 0, pointerEvents: "none" }}
                           whileHover={{ opacity: 1 }}
                           className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                           onClick={() => setIndex(index + 1)}
                        >
                           <CaretRightOutlined />
                        </motion.button>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </MotionConfig>
   );
}
