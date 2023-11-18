import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormUserProfile } from "../../../pages/ProfileForm";
import { getProfile, updateProfile } from "../../../services/auth";
import { toast } from "react-toastify";
import { getFollower } from "../../../services/user";

type UpdateProfilParam = {
  body: FormUserProfile
}


export const FetchProfile = createAsyncThunk('profile/fetch-profile', async (val, {rejectWithValue}) => {
  
  try {
    const response = await getProfile()

    if (response.status === 200) {
     return response.data
    }
    
  } catch (error) {
    toast.error("Oops, something went wrong!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
   });
  }
})

export const UpdateProfile = createAsyncThunk('profile/update-profile', async (val: UpdateProfilParam, {rejectWithValue}) => {
  const {body} = val
  
  try {
    const response = await updateProfile(body)

    if (response.status === 200) {
      toast.success("Update Profile successfully!", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
     })

     return 
    }

  } catch (error) {
    toast.error("Oops, something went wrong!", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
   });
  }
})

export const FetchFollower = createAsyncThunk('profle/fetch-follower', async (val, {rejectWithValue}) => {
  try {
    const response = await getFollower()
    return response.data.data
  } catch (error) {
    return
  }
})
