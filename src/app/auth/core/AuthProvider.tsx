import axios, { AxiosResponse } from "axios";
import {
   Dispatch,
   SetStateAction,
   createContext,
   useContext,
   useEffect,
   useState,
   useMemo,
} from "react";
import { ErrorAuth, ErrorAuthState, UserData, UserLogin } from "./types";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/auth";

type AuthContextProps = {
   token: string | null;
   setToken: Dispatch<SetStateAction<string | null>>;
   login: (value: UserLogin) => void;
   dataUser: UserData | null;
};

interface AuthProviderProps {
   children: React.JSX.Element;
}

const initAuthContextProps = {
   token: null,
   setToken: () => {},
   login: async (user: UserLogin) => {},
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
   console.log("🚀 ~ file: AuthProvider.tsx:44 ~ AuthProvider ~ dataUser:", dataUser);

   async function login(user: UserLogin) {
      try {
         const resData = await loginUser(user);

         if (resData.status === 200) {
            setToken(resData.data.access_token);
            localStorage.setItem("refresh_token", resData.data.refresh_token);
            setDatauser(resData.data.data);
            return resData.status;
         }
      } catch (err) {
         console.log("🚀 ~ file: AuthProvider.tsx:56 ~ login ~ err:", err);
      }
   }

   useEffect(() => {
      if (token && dataUser) {
         localStorage.setItem("user", JSON.stringify(dataUser));
      } else {
         localStorage.removeItem("token");
      }
   }, [token]);

   const contextValue = useMemo(() => ({ token, dataUser, login, setToken }), [token]);

   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
