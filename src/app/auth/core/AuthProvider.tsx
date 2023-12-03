import {
   Dispatch,
   SetStateAction,
   createContext,
   useContext,
   useEffect,
   useState,
   useMemo,
} from "react";
import { UserData, UserLogin, UserRegis } from "./types";
import { loginUser, signupUser } from "../../../services/auth";
import { toast } from "react-toastify";

type AuthContextProps = {
   token: string | null;
   setToken: Dispatch<SetStateAction<string | null>>;
   login: (value: UserLogin) => void;
   signup: (value: UserRegis) => void;
   dataUser: UserData | null;
};

interface AuthProviderProps {
   children: React.JSX.Element;
}

const initAuthContextProps = {
   token: null,
   setToken: () => {},
   login: async (user: UserLogin) => {},
   signup: async (user: UserRegis) => {},
   dataUser: null,
};

const AuthContext = createContext<AuthContextProps>(initAuthContextProps);

const useAuth = () => {
   return useContext(AuthContext);
};
const AuthProvider = ({ children }: AuthProviderProps) => {
   const storedUserData = localStorage.getItem("user");
   const initialUserData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;

   const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
   const [dataUser, setDatauser] = useState<UserData | null>(initialUserData);

   async function signup(user: UserRegis) {
      try {
         const resData = await signupUser(user);

         if (resData.status === 201) {
            toast.success("Sign Up successfully!", {
               position: toast.POSITION.TOP_LEFT,
               autoClose: 2000,
            });
            return { status: resData.status };
         }
      } catch (error) {
         console.log("🚀 ~ file: AuthProvider.tsx:49 ~ Signup ~ error:", error);
      }
   }

   async function login(user: UserLogin) {
      try {
         const resData = await loginUser(user);

         if (resData.status === 200) {
            setToken(resData.data.access_token);
            localStorage.setItem("refresh_token", resData.data.refresh_token);
            localStorage.setItem("token", resData.data.access_token);
            localStorage.setItem("user", JSON.stringify(resData.data.data));
            setDatauser(resData.data.data);
            return resData.status;
         }
      } catch (err) {
         console.log("🚀 ~ file: AuthProvider.tsx:56 ~ login ~ err:", err);
      }
   }

   useEffect(() => {
      if (!token || !dataUser) {
         localStorage.removeItem("token");
      }
   }, [token]);

   const contextValue = useMemo(
      () => ({
         token,
         dataUser,
         login,
         signup,
         setToken,
      }),
      [token, dataUser, login, signup, setToken]
   );

   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
