import httpRequest from "./axiosSetup";

type Comments = {
   comment: string;
};

type LikePost = {
   post: number;
};

export const createPost = (data: FormData) => {
   return httpRequest.post("api/posts", data);
};

export const getPost = (params?: number) => {
   return httpRequest.get(`/api/posts${!!params ? "?page=" + params : ""}`);
};
export const getUserPosts= (params?: number) => {
   return httpRequest.get(`/api/posts/user_posts${!!params ? "?page=" + params : ""}`);
};

export const createComments = (comment: Comments, idPost: number) => {
   return httpRequest.post(`/api/comments/${idPost}`, comment);
};

export const getComments = (idPost: number, params?: number) => {
   return httpRequest.get(`/api/comments/${idPost}${!!params ? "?page=" + params : ""}`);
};

export const likePost = (data: LikePost) => {
   return httpRequest.post(`/api/posts/like`, data);
};
export const getLikePost = (post: number) => {
   return httpRequest.get(`/api/posts/like/${post}`);
};
export const unlikePost = (post: number) => {
   return httpRequest.delete(`/api/posts/unlike/${post}`);
};
