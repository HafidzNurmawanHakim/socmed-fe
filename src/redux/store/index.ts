import { configureStore, createSelector } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import ThunkMiddleware from "redux-thunk";
import { postsSlice } from "../reducers/posts/PostsSlice";
import { AuthSlice } from "../reducers/auth/AuthSlice";

export const store = configureStore({
   reducer: {
      post: postsSlice.reducer,
      auth: AuthSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

const selectLiker = (state: RootState, id_post: number) => state.post.liker[id_post] || [];

export const selectLikerByPostId = createSelector([selectLiker], (liker) => liker);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
