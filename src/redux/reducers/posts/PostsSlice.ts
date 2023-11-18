import { Post } from "../../../pages/Dashboard";
import { createSlice } from "@reduxjs/toolkit";
import { FetchPost } from "./PostsThunk";

export interface PostsSlice {
   data: Array<Post>;
   status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: PostsSlice = {
   data: [],
   status: 'idle'
};

export const postsSlice = createSlice({
   name: "PostsSlice",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(FetchPost.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(FetchPost.fulfilled, (state, action) => {
         state.status = 'succeeded'
         state.data = state.data.concat(action.payload)
      })
      .addCase(FetchPost.rejected, (state, action) => {
         state.status = 'failed'
         state.data = []
      })
   },
});

export const {  } = postsSlice.actions;
export default postsSlice.reducer;
