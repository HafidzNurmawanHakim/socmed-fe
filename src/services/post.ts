import httpRequest from "./axiosSetup";

export const createPost = (data: FormData) => {
   return httpRequest.post("api/posts", data);
};

export const getPost = (params?: number) => {
   return httpRequest.get(`/api/posts${!!params ? "?page=" + params : ""}`);
};
