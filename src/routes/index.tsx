import MasterLayout from "../app/Layout/core/MasterLayout";
import Login from "../app/auth/components/Login";
import { useAuth } from "../app/auth/core/AuthProvider";
import { PrivateRoutes } from "./PrivateRoutes";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const Routes = () => {
   const { token } = useAuth();

   const PublicRoutes = [
      {
         path: "/public",
         element: <div>Public routes</div>,
      },
      {
         path: "/public2",
         element: <div>public2</div>,
      },
   ];

   const AuthenticatedRoutes = [
      {
         path: "/",
         element: <PrivateRoutes />,
         children: [
            {
               path: "/",
               element: <MasterLayout />,
            },
            {
               path: "/login",
               element: <Navigate to="/" />,
            },
         ],
      },
   ];

   const NotAuthenticatedRoutes = [
      {
         path: "/",
         element: <Navigate to={"/login"} />,
      },
      {
         path: "/login",
         element: <Login />,
      },
   ];

   const router = createBrowserRouter([
      ...PublicRoutes,
      ...(!token ? NotAuthenticatedRoutes : AuthenticatedRoutes),
   ]);

   return <RouterProvider router={router} />;
};

export default Routes;
