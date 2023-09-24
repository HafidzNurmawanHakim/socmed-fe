import React, { ChangeEventHandler, useEffect, useState } from "react";
import { MemoAt, MemoImage, MemoLoc } from "../../../assets";
import Dropzone, { useDropzone } from "react-dropzone";
import "react-image-gallery/styles/css/image-gallery.css";
import { EnvironmentOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../auth/core/AuthProvider";
import { toast } from "react-toastify";
import { createPost } from "../../../services/post";
import { getCroppedImg, openModal } from "../../helper/helper";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";

export interface ImagePreview {
   original: string;
   thumbnail: string;
}

interface PostData {
   content: string;
}

type Location = {
   latitude: number;
   longitude: number;
};

const ContentCreator = () => {
   const { dataUser } = useAuth();
   const [previewImages, setPreviewImages] = useState<ImagePreview[]>([]);
   const [images, setImages] = useState<ImagePreview[]>([]);
   const [withImage, setWithImage] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [postData, setPostData] = useState<PostData>({
      content: "",
   });
   const [location, setLocation] = useState<Location | null>(null);
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
   const [currentSlide, setCurrentSlide] = useState<number>(0);
   const getLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               // Mengambil lokasi pengguna
               const { latitude, longitude } = position.coords;
               setLocation({ latitude, longitude });
            },
            (error) => {
               console.error("Gagal mengambil lokasi:", error);
            }
         );
      } else {
         console.error("Geolocation tidak didukung di browser ini.");
      }
   };

   const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
      accept: {
         "image/jpeg": [],
         "image/png": [],
      },
   });

   const onDrop = (acceptedFiles: any) => {
      const newImages = [...images, ...acceptedFiles];
      setImages(newImages);

      const newPreviewImages: Array<ImagePreview> = newImages.map((file) => ({
         original: URL.createObjectURL(file),
         thumbnail: URL.createObjectURL(file),
      }));

      setPreviewImages(newPreviewImages);
   };
   const handleInputChange = (e: any) => {
      setPostData({ ...postData, [e.target.name]: e.target.value });
   };

   const handleCreatePost = async (e: any) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("content", postData.content);
      formData.append("author", dataUser!.id.toString());
      images.forEach((image: any) => {
         formData.append("uploaded_images", image);
      });

      if (postData.content === "") return;

      try {
         setLoading(true);
         const res = await createPost(formData);

         if (res.status === 201) {
            setPostData({ content: "" });
            setPreviewImages([]);
            setWithImage(false);
            toast.success("Post successfully!", {
               position: "top-right",
               autoClose: 1500,
               theme: "dark",
            });
            setLoading(false);
         }
      } catch (error) {
         // Handle error
         toast.error("Oops, something went wrong!", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
         });
         setLoading(false);
      }
   };

   const handleCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
      // const croppedImage = await getCroppedImg(
      //    images[currentIndex].original,
      //    croppedAreaPixels,
      //    0,
      //    { unit: "px", width: 1000, height: 1000 }
      // );
      console.log(
         "🚀 ~ file: ContentCreator.tsx:118 ~ handleCropComplete ~ croppedImage:",
         croppedArea
      );
      // setCroppedImages([...croppedImages, croppedImage]);
   };
   //    <Cropper
   //    image={item.original}
   //    crop={crop}
   //    aspect={1}
   //    onCropChange={setCrop}
   //    onCropComplete={handleCropComplete}
   //    key={item.original}
   // />

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev === previewImages.length - 1 ? 0 : prev + 1)); // Pindah ke slide berikutnya
   };

   const prevSlide = () => {
      setCurrentSlide((prev) => (prev > 0 ? previewImages.length - 1 : prev - 1)); // Pindah ke slide sebelumnya
   };

   return (
      <div>
         <dialog id="create_content_modal" className="modal  ">
            <div className="modal-box max-w-[720px] h-[600px] p-0">
               <div className="h-12 flex items-center pl-6">
                  <h3 className="font-normal text-dark dark:text-light text-lg">Hello!</h3>
               </div>
               <div className="relative w-full h-4/5">
                  {previewImages.length > 0 ? (
                     <div className="carousel w-full">
                        {previewImages.map((item, i) => {
                           return (
                              <>
                                 <div id={"slide" + i} className="carousel-item relative w-full">
                                    <img src={item.original} alt="" />
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                       <a
                                          className="btn btn-circle"
                                          href={"#slide" + (currentSlide - 1)}
                                          onClick={prevSlide}
                                       >
                                          ❮
                                       </a>
                                       <a
                                          className="btn btn-circle"
                                          href={"#slide" + (currentSlide + 1)}
                                          onClick={nextSlide}
                                       >
                                          ❯
                                       </a>
                                    </div>
                                 </div>
                              </>
                           );
                        })}
                     </div>
                  ) : (
                     <Dropzone onDrop={onDrop} multiple>
                        {({ getRootProps, getInputProps }) => (
                           <div
                              {...getRootProps()}
                              className="dropzone flex border border-2 cursor-pointer border-current rounded-md border-dashed m-2 items-center h-full"
                           >
                              <input {...getInputProps()} />
                              <PictureOutlined className="m-auto text-6xl" />
                           </div>
                        )}
                     </Dropzone>
                  )}
               </div>
               <div className="modal-action pr-4">
                  <button className="btn btn-sm">Crop</button>
                  <form method="dialog">
                     {/* if there is a button in form, it will close the modal */}
                     <button className="btn btn-sm">Close</button>
                  </form>
               </div>
            </div>
         </dialog>
         <div className="flex flex-col rounded-md space-x-4 mb-4 p-2 bg-white dark:bg-dark">
            <form onSubmit={handleCreatePost}>
               <div className="flex w-full">
                  <div className="basis-16  mt-2 ml-2">
                     <img
                        src="https://api.multiavatar.com/Binx Bond.png"
                        alt="Background"
                        className="rounded-full mt-1 mx-auto w-10 h-10"
                     />
                  </div>
                  <div className="basis-auto mt-2 dark:border-darker overflow-hidden w-full">
                     <input
                        type="text"
                        placeholder="What's on your mind?"
                        className="input w-full bg-lessWhite mb-2 dark:bg-darker text-dark dark:text-light  rounded-full focus:outline-none"
                        name="content"
                        onChange={handleInputChange}
                        value={postData.content}
                     />
                     <div
                        className={`custom-transition h-0 opacity-0 ${
                           previewImages.length > 0 && "h-20 opacity-100"
                        }`}
                     >
                        {/* <Dropzone onDrop={onDrop} multiple>
                              {({ getRootProps, getInputProps }) => (
                                 <div
                                    {...getRootProps()}
                                    className="dropzone flex border border-2 cursor-pointer border-current rounded-md border-dashed items-center w-32 h-20"
                                 >
                                    <input {...getInputProps()} />
                                    <PlusOutlined className="m-auto" />
                                 </div>
                              )}
                           </Dropzone> */}
                        <div className="flex">
                           {previewImages.length > 0 &&
                              previewImages.map((item, i) => {
                                 return (
                                    <div key={i} className="w-32 rounded-sm overflow-hidden mx-1">
                                       <img src={item.thumbnail} alt="" />
                                    </div>
                                 );
                              })}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex mt-4 justify-between ">
                  <div className="ml-2 mb-2 w-40 flex justify-around">
                     <button
                        type="button"
                        className="btn btn-ghost btn-circle"
                        onClick={() => openModal("create_content_modal")}
                     >
                        <MemoImage fontSize={24} fill="#00ADB5" />
                     </button>
                     <button
                        type="button"
                        className="btn btn-ghost btn-circle"
                        onClick={getLocation}
                     >
                        <EnvironmentOutlined className="text-xl  text-teal" />
                     </button>
                     <button type="button" className="btn btn-ghost btn-circle">
                        <MemoAt fontSize={23} fill="#00ADB5" />
                     </button>
                  </div>
                  <button
                     type="submit"
                     className="btn btn-sm bg-teal border-none text-white mt-2 mr-4 rounded-md"
                  >
                     Post
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ContentCreator;
