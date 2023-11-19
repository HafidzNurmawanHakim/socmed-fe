import MasterLayout from "../app/Layout/core/MasterLayout";
import Login from "../app/auth/components/Login";
import Register from "../app/auth/components/Register";
import { useAuth } from "../app/auth/core/AuthProvider";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ProfileForm from "../pages/ProfileForm";
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
         element: <MasterLayout />,
         children: [
            {
               path: "/",
               element: <Dashboard />,
            },
            {
               path: "/login",
               element: <Navigate to="/" />,
            },
            {
               path: "/profile/:id",
               element: <Profile />,
            },
            {
               path: "/profile/edit/:id",
               element: <ProfileForm />,
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
      {
         path: "/register",
         element: <Register />,
      },
   ];

   const router = createBrowserRouter([
      ...PublicRoutes,
      ...(!token ? NotAuthenticatedRoutes : AuthenticatedRoutes),
   ]);

   return <RouterProvider router={router} />;
};

export default Routes;
