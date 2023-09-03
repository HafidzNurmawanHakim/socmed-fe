import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const axiosInstance = axios.create();

interface MyAxiosRequestConfig extends AxiosRequestConfig {
   _retry?: boolean;
}

axiosInstance.interceptors.response.use(
   (response) => {
      return response;
   },

   async function (error: AxiosError) {
      const originalRequest = error.config as MyAxiosRequestConfig;
      const navigate = useNavigate();

      if (
         error.response?.status === 401 &&
         originalRequest?.url === `${process.env.REACT_APP_BASE_URL}/user/token`
      ) {
         navigate("/login");
         return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
         if (originalRequest) {
            originalRequest._retry = true;
         }
         const refreshToken = localStorage.getItem("refresh_token");
         return axios.post("/user/refresh_token", refreshToken).then((res) => {
            localStorage.setToken(res.data);
            axios.defaults.headers.common["Authorization"] =
               "Bearer " + localStorage.getAccessToken();
            return axios(originalRequest);
         });
      }

      return Promise.reject(error);
   }
);
