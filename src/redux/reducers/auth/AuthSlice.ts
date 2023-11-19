import { createSlice } from "@reduxjs/toolkit";
import { FetchFollower, FetchProfile, UpdateProfile } from "./AuthThunk";
import { UserData } from "../../../app/auth/core/types";
import { FormUserProfile, initialUserProfile } from "../../../app/types/_authTypes";

export interface AuthSlice {
   updateStatus: "idle" | "loading" | "succeeded" | "failed";
   getStatus: "idle" | "loading" | "succeeded" | "failed";
   getFollowerStatus: "idle" | "loading" | "succeeded" | "failed";
   dataProfile: FormUserProfile;
   updateMessage: string;
   follower: Array<UserData>;
   following: Array<UserData>;
}

const initialState: AuthSlice = {
   updateStatus: "idle",
   getStatus: "idle",
   getFollowerStatus: "idle",
   dataProfile: initialUserProfile,
   updateMessage: "",
   follower: [],
   following: [],
};

export const AuthSlice = createSlice({
   name: "AuthSlice",
   initialState,
   reducers: {
      setProfileImage: (state, action) => {
         state.dataProfile.profile_image = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(UpdateProfile.pending, (state) => {
            state.updateStatus = "loading";
         })
         .addCase(UpdateProfile.fulfilled, (state, action) => {
            state.updateStatus = "succeeded";
            state.updateMessage = "succeeded";
         })
         .addCase(UpdateProfile.rejected, (state) => {
            state.updateStatus = "failed";
         });

      builder
         .addCase(FetchProfile.pending, (state) => {
            state.getStatus = "loading";
         })
         .addCase(FetchProfile.fulfilled, (state, action) => {
            state.getStatus = "succeeded";
            state.dataProfile = action.payload;
         })
         .addCase(FetchProfile.rejected, (state) => {
            state.getStatus = "failed";
            state.dataProfile = initialUserProfile;
         });

      builder
         .addCase(FetchFollower.pending, (state) => {
            state.getFollowerStatus = "loading";
         })
         .addCase(FetchFollower.fulfilled, (state, action) => {
            state.getFollowerStatus = "succeeded";
            state.follower = action.payload.follower;
            state.following = action.payload.following;
         })
         .addCase(FetchFollower.rejected, (state) => {
            state.getFollowerStatus = "failed";
         });
   },
});

export const { setProfileImage } = AuthSlice.actions;
export default AuthSlice.reducer;
