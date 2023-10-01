import React, { ChangeEventHandler, useEffect, useState } from "react";
import { MemoAt, MemoImage, MemoLoc } from "../../../assets";
import Dropzone, { useDropzone } from "react-dropzone";
import "react-image-gallery/styles/css/image-gallery.css";
import {
   CaretLeftOutlined,
   CaretRightOutlined,
   EnvironmentOutlined,
   PictureOutlined,
   PlusOutlined,
   SwapLeftOutlined,
   SwapRightOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../auth/core/AuthProvider";
import { toast } from "react-toastify";
import { createPost } from "../../../services/post";
import { fetchBlobFromURL, getCroppedImg, openModal } from "../../helper/helper";
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

type CroppedImagesProps = {
   id: number;
   image: string;
};

const ContentCreator = () => {
   const { dataUser } = useAuth();
   const [previewImages, setPreviewImages] = useState<ImagePreview[]>([]);
   const [images, setImages] = useState<ImagePreview[]>([]);
   const [withImage, setWithImage] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [location, setLocation] = useState<Location | null>(null);
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
   const [currentSlide, setCurrentSlide] = useState<number>(0);
   const [croppedImages, setCroppedImages] = useState<Array<CroppedImagesProps>>([]);
   const [postData, setPostData] = useState<PostData>({
      content: "",
   });
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

   const {} = useDropzone({
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

      try {
         setLoading(true);

         // Gunakan Promise.all untuk mengambil semua gambar sebelum menambahkannya ke FormData
         await Promise.all(
            croppedImages.map(async (item: any) => {
               const blob = await fetchBlobFromURL(item.image);
               const file = new File([blob], "image.jpg", { type: "image/jpeg" });
               // Tambahkan file ke FormData
               formData.append("uploaded_images", file, "image.jpg");
            })
         );

         if (postData.content === "") return;

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
         }
      } catch (error) {
         // Handle error
         toast.error("Oops, something went wrong!", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
         });
      } finally {
         setLoading(false);
      }
   };

   const handleCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
      const croppedImage = await getCroppedImg(previewImages[currentSlide].original, croppedArea);

      const cropped: CroppedImagesProps = {
         id: currentSlide,
         image: croppedImage,
      };

      // Cek apakah objek dengan id yang sama sudah ada dalam array croppedImages
      const existingIndex = croppedImages.findIndex((item) => item.id === currentSlide);

      if (existingIndex !== -1) {
         // Objek dengan id yang sama sudah ada, perbarui properti image-nya
         const updatedCroppedImages = [...croppedImages];
         updatedCroppedImages[existingIndex].image = cropped.image;
         setCroppedImages(updatedCroppedImages);
      } else {
         // Tambahkan objek baru jika tidak ada yang memiliki id yang sama
         setCroppedImages([...croppedImages, cropped]);
      }
   };

   const nextHandle = (e: any) => {
      e.preventDefault();
      if (currentSlide < previewImages.length - 1) {
         setCurrentSlide((prev) => prev + 1);
      } else {
         setCurrentSlide(0);
      }
   };

   const prevHandle = (e: any) => {
      e.preventDefault();
      if (currentSlide > 0) {
         setCurrentSlide((prev) => prev - 1);
      } else {
         setCurrentSlide(previewImages.length - 1);
      }
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
                     <div className="carousel h-full w-full">
                        <div id={`slide${currentSlide}`} className="carousel-item relative w-full">
                           <Cropper
                              image={previewImages[currentSlide].original}
                              crop={crop}
                              aspect={1}
                              onCropChange={setCrop}
                              onCropComplete={handleCropComplete}
                              key={previewImages[currentSlide].original}
                              showGrid
                           />
                           <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                              <a
                                 href={`#slide${currentSlide - 1}`}
                                 className="btn btn-sm btn-circle"
                                 onClick={prevHandle}
                              >
                                 <CaretLeftOutlined />
                              </a>
                              <a
                                 href={`#slide${currentSlide + 1}`}
                                 className="btn btn-sm btn-circle"
                                 onClick={nextHandle}
                              >
                                 <CaretRightOutlined />
                              </a>
                           </div>
                        </div>
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
                  <form method="dialog">
                     {/* if there is a button in form, it will close the modal */}
                     <button className="btn btn-sm">Simpan</button>
                  </form>
                  <button className="btn btn-sm">Batal</button>
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
                           previewImages.length > 0 && "h-60 opacity-100"
                        }`}
                     >
                        <div className="flex">
                           {croppedImages.length > 0 &&
                              croppedImages.map((item, i) => {
                                 return (
                                    <div key={i} className="w-auto rounded-sm overflow-hidden mx-1">
                                       <img src={!!item.image ? item.image : ""} alt="" />
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
