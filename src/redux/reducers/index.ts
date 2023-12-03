import { combineReducers } from "@reduxjs/toolkit";
import PostsReducer from "../reducers/posts/PostsSlice";
import AuthSlice from '../reducers/auth/AuthSlice';

const rootReducer = combineReducers({
   posts: PostsReducer,
   auth: AuthSlice
});


export default rootReducer;
