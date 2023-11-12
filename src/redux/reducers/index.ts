import { combineReducers } from "@reduxjs/toolkit";
import PostsReducer from "../reducers/posts/PostsSlice";

const rootReducer = combineReducers({
   posts: PostsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
