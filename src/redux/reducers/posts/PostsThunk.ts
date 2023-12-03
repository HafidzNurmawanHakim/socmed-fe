import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLikePost, getPost, likePost, unlikePost } from "../../../services/post";
import { Dispatch, SetStateAction } from "react";
import { Post } from "../../../pages/Dashboard";

export interface FetchPostParam {
   pageParams: number | undefined;
   setNextPageParams: Dispatch<SetStateAction<number | undefined>>;
}

interface IdPostParam {
   id_post: number;
}

export const FetchPost = createAsyncThunk<Post[], FetchPostParam>(
   "post/fetchPost",
   async (val, { rejectWithValue }) => {
      const { pageParams, setNextPageParams } = val;
      const response = await getPost(pageParams);
      if (response.data.next) {
         setNextPageParams((prev) => prev && prev + 1);
      } else {
         setNextPageParams(undefined);
      }
      return response.data.results;
   }
);

export const CreateLike = createAsyncThunk<any, IdPostParam>(
   "post/like-post",
   async (val, { rejectWithValue }) => {
      const { id_post } = val;
      try {
         const response = await likePost(id_post);
         return response.data;
      } catch (error) {
         return;
      }
   }
);

export const UncreateLike = createAsyncThunk<any, IdPostParam>(
   "post/unlike-post",
   async (val, { rejectWithValue }) => {
      const { id_post } = val;
      try {
         const response = await unlikePost(id_post);
         return response.data;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const FetchLikePost = createAsyncThunk<any, IdPostParam>(
   "post/fetch-like",
   async (val, { rejectWithValue }) => {
      const { id_post } = val;
      try {
         const response = await getLikePost(id_post);
         return { data: response.data, id_post };
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
