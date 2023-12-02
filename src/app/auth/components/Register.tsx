import {
   BugOutlined,
   EyeInvisibleOutlined,
   EyeOutlined,
   GoogleOutlined,
   LockOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UserRegis } from "../core/types";
import { useAuth } from "../core/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Input, Tooltip } from "@nextui-org/react";

const validationSchema = Yup.object().shape({
   username: Yup.string().required("Username is required!"),
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
      <div className="h-screen w-screen dark:bg-darker py-10 md:py-0">
         <div className="absolute top-6 left-6 2xl:top-10 2xl:left-10 flex items-center">
            <BugOutlined className="text-teal text-3xl" />{" "}
            <span className="ml-2 text-lg pt-2 text-darker">
               <span className="text-white dark:text-light md:text-dark">You</span>
               <span className="text-teal">Bugs</span>
            </span>
         </div>
         <div className="flex justify-center items-center p-6  h-[100%]">
            <div className="xs:w-full 2xl:w-2/6 max-w-[600px] rounded bg-white dark:bg-dark p-4 relative">
               <div className="w-full text-end absolute top-4 right-4">
                  <BugOutlined className="text-teal text-3xl" />
               </div>

               <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
               >
                  {({ isSubmitting, values }) => (
                     <Form className="bg w-5/6 mx-auto mt-4">
                        <h3 className="text-2xl dark:text-white">Register</h3>

                        <div className="relative my-4">
                           <Field name="username">
                              {({
                                 field, // { name, value, onChange, onBlur }
                                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                 meta,
                              }: FieldProps) => {
                                 return (
                                    <Input
                                       size="sm"
                                       type="text"
                                       label="Userame"
                                       placeholder="Userame"
                                       labelPlacement="outside"
                                       isInvalid={meta.touched && meta.error !== undefined}
                                       errorMessage={meta.error}
                                       classNames={{
                                          input: ["text-teal dark:text-light"],
                                          innerWrapper: ["bg-teal"],
                                          inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                                       }}
                                       {...field}
                                    />
                                 );
                              }}
                           </Field>
                        </div>

                        <div className="relative my-4">
                           <Field name="email">
                              {({
                                 field, // { name, value, onChange, onBlur }
                                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                 meta,
                              }: FieldProps) => {
                                 return (
                                    <Input
                                       size="sm"
                                       type="email"
                                       label="Email"
                                       placeholder="Email"
                                       labelPlacement="outside"
                                       isInvalid={meta.touched && meta.error !== undefined}
                                       errorMessage={meta.error}
                                       classNames={{
                                          input: ["text-teal dark:text-light"],
                                          innerWrapper: ["bg-teal"],
                                          inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                                       }}
                                       {...field}
                                    />
                                 );
                              }}
                           </Field>
                        </div>
                        <div className="relative my-4  ">
                           <Field name="password">
                              {({
                                 field, // { name, value, onChange, onBlur }
                                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                 meta,
                              }: FieldProps) => {
                                 return (
                                    <Input
                                       size="sm"
                                       type="password"
                                       label="Password"
                                       placeholder="Password"
                                       labelPlacement="outside"
                                       isInvalid={meta.touched && meta.error !== undefined}
                                       errorMessage={meta.error}
                                       endContent={<LockOutlined />}
                                       classNames={{
                                          input: ["text-teal dark:text-light"],
                                          inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                                       }}
                                       {...field}
                                    />
                                 );
                              }}
                           </Field>
                        </div>
                        <div className="relative my-4">
                           <Field name="password2">
                              {({
                                 field, // { name, value, onChange, onBlur }
                                 form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                 meta,
                              }: FieldProps) => {
                                 return (
                                    <Input
                                       size="sm"
                                       type="password"
                                       label="Password Confirm"
                                       placeholder="Password Confirm"
                                       labelPlacement="outside"
                                       isInvalid={meta.touched && meta.error !== undefined}
                                       errorMessage={meta.error}
                                       endContent={<LockOutlined />}
                                       classNames={{
                                          input: ["text-teal dark:text-light"],
                                          inputWrapper: ["bg-lessLight dark:bg-dark rounded-sm"],
                                       }}
                                       {...field}
                                    />
                                 );
                              }}
                           </Field>
                        </div>

                        <button
                           type="submit"
                           className="btn btn-sm h-10 rounded my-1 bg-teal hover:bg-darkerTeal  border-none w-full"
                           disabled={isSubmitting}
                        >
                           {isSubmitting ? (
                              <>
                                 <span className="normal-case text-dark font-normal text-sm">
                                    Loading...
                                 </span>
                                 <span className=" loading loading-spinner spinner-dark"></span>
                              </>
                           ) : (
                              <span className="normal-case text-white font-normal text-sm text-dark">
                                 Sign Up
                              </span>
                           )}
                        </button>
                        <div className="divider dark:text-light text-dark">OR</div>
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
                              <span className="normal-case font-normal">Sign Up with Google</span>
                           </button>
                        </Tooltip>
                     </Form>
                  )}
               </Formik>
               <div className="text-center mt-6">
                  <span className="text-sm dark:text-light text-dark">
                     Already have account?
                     <a href="/login" className="text-teal">
                        {" "}
                        Login
                     </a>
                  </span>
               </div>
            </div>
         </div>
         <div className="dark:text-light text-xs items-center flex justify-center flex-col absolute bottom-2 w-full">
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

export default Register;
