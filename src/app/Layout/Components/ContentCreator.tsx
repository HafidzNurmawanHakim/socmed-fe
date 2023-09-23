import React, { ChangeEventHandler, useState } from "react";
import { MemoAt, MemoImage, MemoLoc } from "../../../assets";
import Dropzone, { useDropzone } from "react-dropzone";
import "react-image-gallery/styles/css/image-gallery.css";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../../auth/core/AuthProvider";
import { toast } from "react-toastify";
import { createPost } from "../../../services/post";

interface ImagePreview {
   original: string;
   thumbnail: string;
}

interface PostData {
   content: string;
}

const ContentCreator = () => {
   const { dataUser } = useAuth();
   console.log("🚀 ~ file: ContentCreator.tsx:22 ~ ContentCreator ~ dataUser:", dataUser);
   const [previewImages, setPreviewImages] = useState<ImagePreview[]>([]);
   const [images, setImages] = useState<ImagePreview[]>([]);
   const [withImage, setWithImage] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [postData, setPostData] = useState<PostData>({
      content: "",
   });

   const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
      accept: {
         "image/jpeg": [],
         "image/png": [],
      },
   });

   const onDrop = (acceptedFiles: any) => {
      const newImages = [...images, ...acceptedFiles];
      setImages(newImages);

      const newPreviewImages = newImages.map((file) => ({
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
            toast.success("Post successfully!", {
               position: "top-right",
               autoClose: 1500,
               hideProgressBar: false,
               closeOnClick: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
            });
            setLoading(false);
         }
      } catch (error) {
         // Handle error
         toast.error("Oops, something went wrong!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
         });
         setLoading(false);
      }
   };

   return (
      <div>
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
                           withImage && "h-20 opacity-100"
                        }`}
                     >
                        <div className="flex">
                           <Dropzone onDrop={onDrop} multiple>
                              {({ getRootProps, getInputProps }) => (
                                 <div
                                    {...getRootProps()}
                                    className="dropzone flex border border-2 cursor-pointer border-current rounded-md border-dashed items-center w-32 h-20"
                                 >
                                    <input {...getInputProps()} />
                                    <PlusOutlined className="m-auto" />
                                 </div>
                              )}
                           </Dropzone>
                           <div className="flex">
                              {previewImages.length > 0 &&
                                 previewImages.map((item, i) => {
                                    return (
                                       <div
                                          key={i}
                                          className="w-32 rounded-sm overflow-hidden mx-1"
                                       >
                                          <img src={item.thumbnail} alt="" />
                                       </div>
                                    );
                                 })}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex mt-4 justify-between ">
                  <div className="ml-2 mb-2 w-40 flex justify-around">
                     <button
                        type="button"
                        className="btn btn-ghost btn-circle"
                        onClick={() => setWithImage(!withImage)}
                     >
                        <MemoImage fontSize={24} fill="teal" />
                     </button>
                     <button type="button" className="btn btn-ghost btn-circle">
                        <MemoLoc fontSize={24} fill="teal" />
                     </button>
                     <button type="button" className="btn btn-ghost btn-circle">
                        <MemoAt fontSize={24} fill="teal" />
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
