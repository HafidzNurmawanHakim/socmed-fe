import { Post } from "../../../pages/Dashboard";
import { createSlice } from "@reduxjs/toolkit";
import { FetchLikePost, FetchPost } from "./PostsThunk";
import { UserData } from "../../../app/auth/core/types";
import { LikerPost } from "../../../app/types/_postTypes";

export interface PostsSlice {
   data: Array<Post>;
   status: "idle" | "loading" | "succeeded" | "failed";
   fetchLikeStatus: "idle" | "loading" | "succeeded" | "failed";
   liker: Record<string, LikerPost[]>;
}

const initialState: PostsSlice = {
   data: [],
   status: "idle",
   fetchLikeStatus: "idle",
   liker: {},
};

export const postsSlice = createSlice({
   name: "PostsSlice",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(FetchPost.pending, (state) => {
            state.status = "loading";
         })
         .addCase(FetchPost.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = state.data.concat(action.payload);
         })
         .addCase(FetchPost.rejected, (state, action) => {
            state.status = "failed";
            state.data = [];
         });

      builder
         .addCase(FetchLikePost.pending, (state) => {
            state.fetchLikeStatus = "loading";
         })
         .addCase(FetchLikePost.fulfilled, (state, action) => {
            state.fetchLikeStatus = "succeeded";
            state.liker[action.payload.id_post] = action.payload.data;
         })
         .addCase(FetchLikePost.rejected, (state, action) => {
            state.fetchLikeStatus = "failed";
         });
   },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
