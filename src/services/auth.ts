import { UserLogin, UserRegis } from "../app/auth/core/types";
import { FormUserProfile } from "../app/types/_authTypes";
import httpRequest from "./axiosSetup";

export const loginUser = (data: UserLogin) => {
   return httpRequest.post("/user/login", data);
};

export const signupUser = (data: UserRegis) => {
   return httpRequest.post("/user/signup", data);
};

export const getProfile = (idUser: number) => {
   return httpRequest.get(`user/get_profile/${idUser}`);
};
export const updateProfile = (body: FormUserProfile) => {
   return httpRequest.put("user/update", body);
};
