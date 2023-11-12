import { UserLogin, UserRegis } from "../app/auth/core/types";
import httpRequest from "./axiosSetup";

export const loginUser = (data: UserLogin) => {
   return httpRequest.post("/user/login", data);
};

export const signupUser = (data: UserRegis) => {
   return httpRequest.post("/user/signup", data);
};

export const getProfile = () => {
   return httpRequest.get("user/get_profile");
};
