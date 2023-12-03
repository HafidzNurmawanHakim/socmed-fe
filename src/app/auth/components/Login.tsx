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
import { Tooltip } from "@nextui-org/react";

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
      <div id="login" className={`h-screen w-screen dark:bg-darker py-10 md:py-0`}>
         {/* <div className="bg-login bg-cover h-full w-full absolute top-0 left-0"></div> */}
         <div className="absolute top-6 left-6 2xl:top-10 2xl:left-10">
            <BugOutlined className="text-teal text-3xl" />{" "}
            <span className="ml-2 text-lg pt-2 text-darker">
               <span className="text-white dark:text-light md:text-dark">You</span>
               <span className="text-teal">Bugs</span>
            </span>
         </div>
         <div className="flex h-[90%] items-center justify-center">
            <div className="rounded-md border-2 border-dark dark:bg-dark dark:text-light text-light">
               <div className="w-full text-end">
                  <BugOutlined className="text-teal mt-4 me-4 text-3xl" />
               </div>
               <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
               >
                  {({ isSubmitting, values }) => (
                     <Form className="w-5/6 md:w-3/4 m-auto p-6 rounded-xl md:rounded-s-xl space-y-4 xs:px-2">
                        <h2 className="text-2xl mb-4">Login</h2>
                        <div className="relative">
                           <label htmlFor="username" className="font-normal text-sm ">
                              Username
                           </label>
                           <Field
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Username"
                              className="input input-bordered input-sm text-dark dark:text-light h-10 rounded  w-full pr-10"
                           />
                           <span className="absolute text-xl top-[40%] right-3 transform-translate-y-1/2 ">
                              <UserOutlined />
                           </span>
                        </div>
                        <div className="relative">
                           <label htmlFor="password" className="font-normal text-sm ">
                              Password
                           </label>
                           <Field
                              type={seePass ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="Password"
                              className="input input-bordered input-sm text-dark dark:text-light h-10 rounded   w-full pr-10"
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
                                 className="checkbox checkbox-sm"
                              />
                              <label htmlFor="remember" className="ml-2 text-xs xs:text-xxs">
                                 Remember me
                              </label>
                           </div>
                           <div className="text-xs xs:text-xxs">
                              <a href="#">Forgot password?</a>
                           </div>
                        </div>
                        <button
                           type="submit"
                           className="btn btn-sm h-10 rounded bg-teal hover:bg-darkerTeal  border-none w-full"
                           disabled={isSubmitting}
                        >
                           {isSubmitting ? (
                              <>
                                 <span className="normal-case text-dark dark:text-light font-normal">
                                    Loading...
                                 </span>
                                 <span className=" loading loading-spinner spinner-dark"></span>
                              </>
                           ) : (
                              <span className="normal-case dark:text-white font-normal text-dark">
                                 Login
                              </span>
                           )}
                        </button>
                        <Tooltip
                           key={"bottom"}
                           placement={"bottom"}
                           content={"This feature is currently disabled!"}
                           color="secondary"
                        >
                           <button
                              type="button"
                              className="btn btn-sm h-10 rounded dark:text-light text-dark btn-outline w-full disabled"
                           >
                              <GoogleOutlined />
                              <span className="normal-case font-normal">Login with Google</span>
                           </button>
                        </Tooltip>
                     </Form>
                  )}
               </Formik>

               <div className="text-center py-6">
                  <span className="text-sm xs:text-xxs dark:text-light text-dark">
                     Dont have account?{" "}
                     <a href="/register" className="text-teal">
                        {" "}
                        Register
                     </a>
                  </span>
               </div>
            </div>
         </div>
         <div className="dark:text-light text-xs items-center flex justify-center flex-col">
            <div className="w-fit flex items-center">
               <span className="text-sm ml-2 text-darker">
                  <span className="text-white dark:text-light md:text-dark">You</span>
                  <span className="text-teal">Bugs</span>
               </span>
               <BugOutlined className="text-teal mx-2 inline-block text-lg" />
            </div>
            <div className="mt-2">
               <span className="cursor-pointer mx-1 hover:text-teal">User Agreement</span>
               <span className="cursor-pointer mx-1 hover:text-teal">Privacy Policy</span>
               <span className="cursor-pointer mx-1 hover:text-teal">Copyright Policy</span>
            </div>
         </div>
      </div>
   );
};

export default Login;
