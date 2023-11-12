import { Post } from "../../../pages/Dashboard";
import { createSlice } from "@reduxjs/toolkit";

export interface PostsSlice {
   posts: Array<Post>;
}

const initialState: PostsSlice = {
   posts: [],
};

export const postsSlice = createSlice({
   name: "Posts",
   initialState,
   reducers: {
      getPosts: (state, action) => {},
   },
});

export const { getPosts } = postsSlice.actions;
export default postsSlice.reducer;
