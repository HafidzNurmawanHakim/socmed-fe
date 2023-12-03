import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "../../../services/auth";
import { toast } from "react-toastify";
import { getFollower } from "../../../services/user";
import { FormUserProfile } from "../../../app/types/_authTypes";

type UpdateProfilParam = {
   body: FormUserProfile;
};

interface IdUserParam {
   id_user: number | undefined;
}

export const FetchProfile = createAsyncThunk<any, IdUserParam>(
   "profile/fetch-profile",
   async (val, { rejectWithValue }) => {
      const { id_user } = val;
      if (id_user) {
         try {
            const response = await getProfile(id_user);

            if (response.status === 200) {
               return response.data;
            }
         } catch (error) {
            toast.error("Oops, something went wrong!", {
               position: "top-right",
               autoClose: 1500,
               theme: "dark",
            });
         }
      }
   }
);

export const UpdateProfile = createAsyncThunk(
   "profile/update-profile",
   async (val: UpdateProfilParam, { rejectWithValue }) => {
      const { body } = val;

      try {
         const response = await updateProfile(body);

         if (response.status === 200) {
            toast.success("Update Profile successfully!", {
               position: "top-right",
               autoClose: 1500,
               theme: "dark",
            });

            return;
         }
      } catch (error) {
         toast.error("Oops, something went wrong!", {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
         });
      }
   }
);

export const FetchFollower = createAsyncThunk<any, IdUserParam>(
   "profle/fetch-follower",
   async (val, { rejectWithValue }) => {
      const { id_user } = val;
      if (id_user) {
         try {
            const response = await getFollower(id_user);
            return response.data.data;
         } catch (error) {
            return;
         }
      }
   }
);
