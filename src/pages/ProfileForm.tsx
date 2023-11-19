import React, { useEffect, useState } from "react";
import { useAuth } from "../app/auth/core/AuthProvider";
import { UserData, UserProfile } from "../app/auth/core/types";
import { EditOutlined, PictureOutlined, SwapLeftOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import Cropper, { Area } from "react-easy-crop";
import { fetchBlobFromURL, getCroppedImg, openModal } from "../app/helper/helper";
import { Point } from "framer-motion";
import { Field, FieldProps, Form, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { FetchProfile, UpdateProfile } from "../redux/reducers/auth/AuthThunk";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileImage } from "../redux/reducers/auth/AuthSlice";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { ProfileFormSkeleton } from "../app/Layout/Components/Skeleton";
import { FormUserProfile, initialUserProfile } from "../app/types/_authTypes";

const { REACT_APP_BASE_URL } = process.env;

interface ImagePreview {
   original: string;
   thumbnail: string;
   fileName: string;
}

const ProfileForm = () => {
   const { dataUser } = useAuth();
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const params = useParams();
   const userProfile = useSelector((state: RootState) => state.auth.dataProfile);
   const fetchStatus = useSelector((state: RootState) => state.auth.updateStatus);
   const [previewImages, setPreviewImages] = useState<ImagePreview>({
      original: "",
      thumbnail: "",
      fileName: "",
   });
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });

   useEffect(() => {
      if (JSON.stringify(userProfile) === JSON.stringify(initialUserProfile)) {
         dispatch(FetchProfile({ id_user: dataUser?.id! }));
      }
   }, [userProfile]);

   const onDrop = (acceptedFiles: any) => {
      const newPreviewImages: ImagePreview = {
         original: URL.createObjectURL(acceptedFiles[0]),
         thumbnail: URL.createObjectURL(acceptedFiles[0]),
         fileName: acceptedFiles[0].name,
      };

      setPreviewImages(newPreviewImages);
   };

   const handleCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
      const croppedImage = await getCroppedImg(previewImages.original, croppedArea);

      dispatch(setProfileImage(croppedImage));
   };

   const cancelHandle = () => {
      setPreviewImages({ original: "", thumbnail: "", fileName: "" });
      navigate(-1);
   };

   const handleSubmit = async (
      values: FormUserProfile,
      actions: FormikHelpers<FormUserProfile>
   ) => {
      let formData: any = new FormData();

      if (JSON.stringify(userProfile) === JSON.stringify(values)) {
         return toast.info("Anda belum membuat perubahan!", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
         });
      }

      try {
         await Promise.all(
            Object.keys(values).map(async (item) => {
               if (item === "profile_image") {
                  const blob = await fetchBlobFromURL(
                     userProfile !== null ? userProfile.profile_image : ""
                  );
                  const file = new File([blob], previewImages.fileName, { type: "image/jpeg" });

                  formData.append("profile_image", file, previewImages.fileName);
               } else {
                  formData.append(item, values[item as keyof typeof userProfile]);
               }
            })
         );

         return await dispatch(UpdateProfile({ body: formData }));
      } catch (error) {
         toast.error("Oops, something went wrong!", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
         });
         console.log(error);
      }
   };

   if (fetchStatus === "loading") {
      return <ProfileFormSkeleton />;
   }

   return (
      <div className=" bg-white dark:bg-darker mt-2 mr-2 rounded-md p-4">
         <button className="btn dark:bg-dark shadow-md btn-sm" onClick={() => navigate(-1)}>
            <SwapLeftOutlined className="text-teal text-xl" />
            <p className="normal-case font-normal">Back</p>
         </button>

         <dialog id="update_profile_modal" className="modal  ">
            <div className="modal-box max-w-[720px] h-[600px] p-0">
               <div className="h-12 flex items-center pl-6">
                  <h3 className="font-normal text-dark dark:text-light text-lg">Pilih Gambar</h3>
               </div>
               <div className="relative w-full h-4/5">
                  {previewImages.original !== "" ? (
                     <Cropper
                        image={previewImages.original}
                        crop={crop}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={handleCropComplete}
                        key={previewImages.original}
                        showGrid
                     />
                  ) : (
                     <Dropzone onDrop={onDrop} multiple={false}>
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
                     <button className="btn btn-sm mx-2" onClick={cancelHandle}>
                        Batal
                     </button>
                  </form>
               </div>
            </div>
         </dialog>

         <div className="avatar block pt-4 mx-auto relative ">
            <div className="w-32 mask mask-squircle mx-auto cursor-pointer">
               <img
                  src={
                     userProfile.profile_image !== ""
                        ? `${REACT_APP_BASE_URL}/api${userProfile?.profile_image}`
                        : `https://ui-avatars.com/api/?name=${dataUser?.username}`
                  }
                  alt="Special Avatar"
               />
            </div>
            <div className="mx-auto w-fit relative bottom-10 left-[36px]">
               <button
                  className="btn dark:bg-dark shadow-md btn-circle"
                  onClick={() => openModal("update_profile_modal")}
               >
                  <EditOutlined className="text-teal text-xl" />
               </button>
            </div>
         </div>
         <Formik initialValues={userProfile} onSubmit={handleSubmit} enableReinitialize>
            {({ isSubmitting, values, setFieldValue }: FormikProps<FormUserProfile>) => (
               <Form className="border-2 border-dark p-4 rounded-lg">
                  <h1 className="dark:text-light text-center mb-4">Profile Info</h1>
                  <div className="flex gap-8 mb-8">
                     <Field name="username">
                        {({
                           field, // { name, value, onChange, onBlur }
                           form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, fetchProfileStatus, etc.
                           meta,
                        }: FieldProps) => (
                           <Input
                              type="text"
                              label="Username"
                              placeholder="Username"
                              labelPlacement="outside"
                              classNames={{
                                 input: ["text-teal dark:text-light"],
                                 innerWrapper: ["bg-teal"],
                                 inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                                 label: ["normal-case"],
                              }}
                              {...field}
                           />
                        )}
                     </Field>
                     <Field name="first_name">
                        {({
                           field, // { name, value, onChange, onBlur }
                           form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                           meta,
                        }: FieldProps) => (
                           <Input
                              type="text"
                              label="First Name"
                              placeholder="First name"
                              labelPlacement="outside"
                              classNames={{
                                 input: ["text-teal dark:text-light"],
                                 innerWrapper: ["bg-teal"],
                                 inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                              }}
                              {...field}
                           />
                        )}
                     </Field>
                  </div>
                  <div className="flex gap-8 mb-8">
                     <Field name="last_name">
                        {({
                           field, // { name, value, onChange, onBlur }
                           form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                           meta,
                        }: FieldProps) => (
                           <Input
                              type="text"
                              label="Last Name"
                              placeholder="Last name"
                              labelPlacement="outside"
                              classNames={{
                                 input: ["text-teal dark:text-light"],
                                 innerWrapper: ["bg-teal"],
                                 inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                                 label: ["normal-case"],
                              }}
                              {...field}
                           />
                        )}
                     </Field>
                     <Field name="birthdate">
                        {({
                           field, // { name, value, onChange, onBlur }
                           form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                           meta,
                        }: FieldProps) => (
                           <Input
                              type="date"
                              label="Birthdate"
                              placeholder="dd/mm/yyyy"
                              labelPlacement="outside"
                              classNames={{
                                 input: ["text-teal dark:text-light"],
                                 innerWrapper: ["bg-teal"],
                                 inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                              }}
                              {...field}
                              value={moment(field.value, "yyyy-MM-DD").format("yyyy-MM-DD")}
                           />
                        )}
                     </Field>
                  </div>
                  <Field name="gender">
                     {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                     }: FieldProps) => (
                        <RadioGroup
                           className="min-w-[48%]"
                           label="Gender"
                           orientation="horizontal"
                           {...field}
                        >
                           <Radio value="M">Male</Radio>
                           <Radio value="F">Female</Radio>
                        </RadioGroup>
                     )}
                  </Field>

                  <Field name="bio">
                     {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                     }: FieldProps) => (
                        <Input
                           type="text"
                           label="Bio"
                           placeholder="Your bio"
                           labelPlacement="outside"
                           className="mt-8"
                           classNames={{
                              input: ["text-teal dark:text-light"],
                              inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm max-w-lg"],
                           }}
                           {...field}
                        />
                     )}
                  </Field>
                  <div className="text-end mt-8">
                     <button
                        type="button"
                        className="btn dark:bg-dark mx-2 btn-md  border-2 hover:border-teal normal-case text-teal font-normal shadow-md"
                        onClick={cancelHandle}
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        className="btn dark:bg-dark mx-2 btn-md  border-2 hover:border-teal normal-case text-teal font-normal shadow-md"
                     >
                        Save Changes
                     </button>
                  </div>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default ProfileForm;
