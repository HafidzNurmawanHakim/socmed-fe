import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../app/auth/core/AuthProvider";

export const PrivateRoutes = () => {
   const { token } = useAuth();

   if (!token) return <Navigate to={"/login"} />;

   return <Outlet />;
};
