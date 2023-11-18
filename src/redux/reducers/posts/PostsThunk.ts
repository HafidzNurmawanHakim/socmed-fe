import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPost } from "../../../services/post";
import { Dispatch, SetStateAction } from "react";
import { Post } from "../../../pages/Dashboard";


export interface FetchPostParam {
  pageParams: number | undefined
  setNextPageParams: Dispatch<SetStateAction<number | undefined>>
}


export const FetchPost = createAsyncThunk<Post[], FetchPostParam>('post/fetchPost', async (val, {rejectWithValue}) => {
  const {pageParams, setNextPageParams} = val
  const response = await getPost(pageParams) 
  if (response.data.next) {
    setNextPageParams((prev) => prev && prev + 1);
  } else {
    setNextPageParams(undefined);
  }
  return response.data.results
})
