import {
   BugOutlined,
   EyeInvisibleOutlined,
   EyeOutlined,
   GoogleOutlined,
   LockOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UserRegis } from "../core/types";
import { useAuth } from "../core/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
   username: Yup.string().required("Username is required!"),
   first_name: Yup.string().required("First Name is required!"),
   last_name: Yup.string().required("Last Name is required!"),
   email: Yup.string().email().required("email is required!"),
   password: Yup.string().required("Password is required!"),
   password2: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match!")
      .required("Confirm Password is required!"),
});

const initialValues: UserRegis = {
   username: "",
   password: "",
   password2: "",
   first_name: "",
   last_name: "",
   email: "",
};

const Register = () => {
   const { signup } = useAuth();
   const [seePass, setSeePass] = useState<boolean>(false);
   const [seePass2, setSeePass2] = useState<boolean>(false);
   const navigate = useNavigate();

   const handleSubmit = async (values: UserRegis, actions: FormikHelpers<UserRegis>) => {
      try {
         const res: any = await signup(values);
         if (res.status === 201) {
            return setTimeout(() => {
               navigate("/login");
            }, 2000);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="dark:bg-darker bg-lessWhite w-screen h-screen text-dark dark:text-light relative">
         <div className="absolute top-6 left-6 ">
            <BugOutlined className="text-teal text-3xl mr-2" />
            <span className="ml-2 text-lg ">
               <span className="text-teal">Bug</span>
               <span className="text-dark dark:text-light">You</span>
            </span>
         </div>
         <div className="flex">
            <div className="basis-1/2 h-screen px-20 py-28">
               <div className=" bg-white dark:bg-darker h-4/5 p-10 px-20">
                  <h3 className="text-2xl dark:text-white">Register</h3>
                  <Formik
                     initialValues={initialValues}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}
                  >
                     {({ isSubmitting, values }) => (
                        <Form className="">
                           <div className="relative my-4">
                              <label
                                 htmlFor="username"
                                 className="text-dark dark:text-light font-normal text-black"
                              >
                                 Username
                              </label>
                              <Field
                                 type="text"
                                 id="username"
                                 name="username"
                                 placeholder="Username"
                                 className="input input-bordered text-black bg-white input-md w-full pr-10"
                              />
                              <ErrorMessage
                                 name="username"
                                 component="div"
                                 className="text-red-600"
                              />
                              <span className="absolute text-xl top-[40%] right-3 transform-translate-y-1/2 ">
                                 <UserOutlined />
                              </span>
                           </div>
                           <div className="relative my-4">
                              <label
                                 htmlFor="first_name"
                                 className="text-dark dark:text-light font-normal text-black"
                              >
                                 First Name
                              </label>
                              <Field
                                 type="text"
                                 id="first_name"
                                 name="first_name"
                                 placeholder="First Name"
                                 className="input input-bordered text-black bg-white input-md w-full pr-10"
                              />
                              <ErrorMessage
                                 name="first_name"
                                 component="div"
                                 className="text-red-600"
                              />
                              <span className="absolute text-xl top-[40%] right-3 transform-translate-y-1/2 ">
                                 <UserOutlined />
                              </span>
                           </div>
                           <div className="relative my-4">
                              <label
                                 htmlFor="last_name"
                                 className="text-dark dark:text-light font-normal text-black"
                              >
                                 Last Name
                              </label>
                              <Field
                                 type="text"
                                 id="last_name"
                                 name="last_name"
                                 placeholder="Last Name"
                                 className="input input-bordered text-black bg-white input-md w-full pr-10"
                              />
                              <ErrorMessage
                                 name="last_name"
                                 component="div"
                                 className="text-red-600"
                              />
                              <span className="absolute text-xl top-[40%] right-3 transform-translate-y-1/2 ">
                                 <UserOutlined />
                              </span>
                           </div>
                           <div className="relative my-4">
                              <label
                                 htmlFor="email"
                                 className="text-dark dark:text-light font-normal text-black"
                              >
                                 Email
                              </label>
                              <Field
                                 type="email"
                                 id="email"
                                 name="email"
                                 placeholder="Email"
                                 className="input input-bordered text-black bg-white input-md w-full pr-10"
                              />
                              <ErrorMessage name="email" component="div" className="text-red-600" />
                              <span className="absolute text-xl top-[40%] right-3 transform-translate-y-1/2 ">
                                 <UserOutlined />
                              </span>
                           </div>
                           <div className="relative my-4  ">
                              <label
                                 htmlFor="password"
                                 className="text-dark dark:text-light font-normal text-black"
                              >
                                 Password
                              </label>
                              <Field
                                 type={seePass ? "text" : "password"}
                                 id="password"
                                 name="password"
                                 placeholder="Password"
                                 className="input input-bordered text-black bg-white input-md w-full pr-10"
                              />
                              <ErrorMessage
                                 name="password"
                                 component="div"
                                 className="text-red-600"
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
                           <div className="relative my-4">
                              <label
                                 htmlFor="password2"
                                 className="text-dark dark:text-light font-normal text-black"
                              >
                                 Password Confirm
                              </label>
                              <Field
                                 type={seePass2 ? "text" : "password"}
                                 id="password2"
                                 name="password2"
                                 placeholder="Password Confirm"
                                 className="input input-bordered text-black bg-white input-md w-full pr-10"
                              />
                              <ErrorMessage
                                 name="password2"
                                 component="div"
                                 className="text-red-600"
                              />
                              <div className="absolute flex items-center text-xl top-[35%]  right-3 transform-translate-y-1/2">
                                 <div
                                    className={`pb-1 mr-2 ${
                                       !!values.password2 ? "opacity-100" : "opacity-0"
                                    }`}
                                 >
                                    {seePass2 ? (
                                       <EyeInvisibleOutlined onClick={() => setSeePass2(false)} />
                                    ) : (
                                       <EyeOutlined onClick={() => setSeePass2(true)} />
                                    )}
                                 </div>

                                 <LockOutlined />
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
                                    Sign Up
                                 </span>
                              )}
                           </button>
                           <button type="button" className="btn btn-outline w-full">
                              <GoogleOutlined />
                              <span className="normal-case font-normal">Sign Up with Google</span>
                           </button>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
            <div className="basis-1/2 flex items-center justify-center">
               <button className="btn">Ini Gambar</button>
            </div>
         </div>
      </div>
   );
};

export default Register;
