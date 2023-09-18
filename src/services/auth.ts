import { UserLogin } from "../app/auth/core/types";
import httpRequest from "./axiosSetup";

export const loginUser = (data: UserLogin) => {
   return httpRequest.post("/user/login", data);
};
