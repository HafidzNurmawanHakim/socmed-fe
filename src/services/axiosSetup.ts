import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const httpRequest = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
});

interface MyAxiosRequestConfig extends AxiosRequestConfig {
   _retry?: boolean;
}

httpRequest.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
  
);

httpRequest.interceptors.response.use(
   (response) => {
      return response;
   },

   async function (error: AxiosError) {
      const originalRequest = error.config as MyAxiosRequestConfig;

      if (error.response?.status === 401 && originalRequest?.url === `/user/token`) {
         return Promise.reject(error);
      }
      if (error.response?.status === 401 && originalRequest?.url === `/user/login`) {
         toast.error("Username Atau password salah!", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
         });

         return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
         if (originalRequest) {
            originalRequest._retry = true;
         }

         const refreshToken = {
            refresh: localStorage.getItem("refresh_token"),
         };
         return axios
            .post(`${process.env.REACT_APP_BASE_URL}/user/refresh_token`, refreshToken)
            .then((res) => {
               let dataUser = localStorage.getItem("user");

               if (!dataUser) {
                  return;
               }

               localStorage.setItem("token", res.data.access);
               if (originalRequest.headers) {
               originalRequest.headers['Authorization'] = "Bearer " + res.data.access;

               }
               return axios(originalRequest);
            })
            .catch((err) => {
               localStorage.removeItem("token");
               localStorage.removeItem("user");
            });
      }

      return Promise.reject(error);
   }
);

export default httpRequest;
