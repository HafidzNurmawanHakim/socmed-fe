import {
   BugOutlined,
   EyeInvisibleOutlined,
   EyeOutlined,
   GoogleOutlined,
   LockOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Formik, Form, Field, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../core/AuthProvider";
import { UserLogin } from "../core/types";

const validationSchema = Yup.object().shape({
   username: Yup.string().required("Username is required!"),
   password: Yup.string().required("Password is required!"),
});

const Login = () => {
   const [seePass, setSeePass] = useState(false);

   const { login } = useAuth();

   const handleSubmit = async (values: UserLogin, actions: FormikHelpers<UserLogin>) => {
      try {
         const res = await login(values);
         console.log(res, "res");
      } catch (error) {
         console.log(error);
      }
   };

   const initialValues = {
      username: "",
      password: "",
   };

   return (
      <div id="login" className={`h-screen w-screen custom-gradient-bg py-10 md:py-0`}>
         {/* <div className="bg-login bg-cover h-full w-full absolute top-0 left-0"></div> */}
         <div className="md:flex rounded-full drop-shadow-xl w-3/4 m-auto md:pt-20">
            <div className="basis-1/2 bg-dark z-10 rounded-xl bg-login md:bg-none md:bg-white bg-right md:rounded-s-xl  py-20 2xl:py-36  relative">
               <div className="absolute top-6 left-6 2xl:top-10 2xl:left-10">
                  <BugOutlined style={{ fontSize: "40px", color: "teal" }} />{" "}
                  <span className="ml-2 text-lg text-darker">
                     <span className="text-teal">Bug</span>
                     <span className="text-white md:text-dark">You</span>
                  </span>
               </div>
               <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
               >
                  {({ isSubmitting, values }) => (
                     <Form className="w-5/6 md:w-3/4 m-auto p-6 rounded-xl md:rounded-s-xl space-y-4">
                        <h2 className="text-2xl md:text-black mb-4">Login</h2>
                        <div className="relative">
                           <label htmlFor="username" className="font-normal text-black">
                              Username
                           </label>
                           <Field
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Username"
                              className="input input-bordered text-black bg-white input-md w-full pr-10"
                           />
                           <span className="absolute text-xl top-[40%] right-3 transform-translate-y-1/2 ">
                              <UserOutlined />
                           </span>
                        </div>
                        <div className="relative">
                           <label htmlFor="password" className="font-normal text-black">
                              Password
                           </label>
                           <Field
                              type={seePass ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="Password"
                              className="input input-bordered text-black bg-white input-md w-full pr-10"
                           />
                           <div className="absolute flex items-center text-xl top-[45%]  right-3 transform-translate-y-1/2">
                              <div
                                 className={`pb-1 mr-2 ${
                                    !!values.password ? "opacity-100" : "opacity-0"
                                 }`}
                              >
                                 {seePass ? (
                                    <EyeInvisibleOutlined onClick={() => setSeePass(false)} />
                                 ) : (
                                    <EyeOutlined onClick={() => setSeePass(true)} />
                                 )}
                              </div>

                              <LockOutlined />
                           </div>
                        </div>
                        <div className="flex justify-between items-center">
                           <div className="flex items-center">
                              <Field
                                 type="checkbox"
                                 id="remember"
                                 name="remember"
                                 className="checkbox"
                              />
                              <label htmlFor="remember" className="ml-2 text-xs md:text-sm">
                                 Remember me
                              </label>
                           </div>
                           <div className="text-xs md:text-sm">
                              <a href="#">Forgot password?</a>
                           </div>
                        </div>
                        <button
                           type="submit"
                           className="btn bg-teal hover:bg-darkerTeal  border-none w-full"
                           disabled={isSubmitting}
                        >
                           {isSubmitting ? (
                              <>
                                 <span className="normal-case text-dark font-normal">
                                    Loading...
                                 </span>
                                 <span className=" loading loading-spinner spinner-dark"></span>
                              </>
                           ) : (
                              <span className="normal-case text-white font-normal text-dark">
                                 Login
                              </span>
                           )}
                        </button>
                        <button type="button" className="btn btn-outline w-full">
                           <GoogleOutlined />
                           <span className="normal-case font-normal">Login with Google</span>
                        </button>
                     </Form>
                  )}
               </Formik>
               <div className="w-full py-2 text-center absolute bottom-0 ">
                  <span className="text-sm md:text-dark">
                     Dont have account?{" "}
                     <a href="#" className="text-teal">
                        {" "}
                        Register
                     </a>
                  </span>
               </div>
            </div>
            <div className="basis-1/2 bg-darker hidden md:block md:bg-login bg-right bg-cover rounded-e-xl py-20 pl-10 relative">
               <div className="text-white">
                  <h1 className="text-4xl">
                     Welcome to <span className="text-teal">Bug</span>You
                  </h1>
               </div>
               <div className="mt-10">
                  <p>
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos
                     blanditiis voluptatem harum ducimus odio sequi eaque dolorem, fugiat omnis ea
                     eius adipisci? Officia, harum ullam!
                  </p>
               </div>
               <div className="text-xl absolute flex items-center right-10 bottom-10">
                  <div className="pt-4 mr-4">
                     <span className="text-teal">Bug</span>
                     <span className="text-white">You</span>
                  </div>
                  <div className="text-teal text-4xl">
                     <BugOutlined />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
