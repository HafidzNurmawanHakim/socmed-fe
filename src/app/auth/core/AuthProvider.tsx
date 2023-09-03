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

type AuthContextProps = {
   token: string | null;
   setToken: Dispatch<SetStateAction<string | null>>;
   login: (value: UserLogin) => Promise<void | AxiosResponse<any, any>>;
   dataUser: UserData | undefined;
};

interface AuthProviderProps {
   children: React.JSX.Element;
}

const initAuthContextProps = {
   token: null,
   setToken: () => {},
   login: async (user: UserLogin) => {},
   dataUser: undefined,
};

const AuthContext = createContext<AuthContextProps>(initAuthContextProps);

const useAuth = () => {
   return useContext(AuthContext);
};
const AuthProvider = ({ children }: AuthProviderProps) => {
   const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
   const [dataUser, setDatauser] = useState<UserData | undefined>(undefined);

   async function login(user: UserLogin) {
      axios
         .post("/user/login", user)
         .then((res) => {
            setToken(res.data.access_token);
            setDatauser(res.data.data);
            return res.status;
         })
         .catch((err) => {
            return err.status;
         });
   }

   useEffect(() => {
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         localStorage.setItem("token", token);
      } else {
         delete axios.defaults.headers.common["Authorization"];
         localStorage.removeItem("token");
      }
   }, [token]);

   const contextValue = useMemo(() => ({ token, dataUser, login, setToken }), [token]);

   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
