import "./App.css";
import { AppControllerProvider } from "./app/Layout/core/AppController";
import MasterLayout from "./app/Layout/core/MasterLayout";
import { ThemeProvider } from "./app/Layout/core/ThemeProvider";
import { AuthProvider } from "./app/auth/core/AuthProvider";
import Routes from "./routes";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
   return (
      <div className="h-screen w-screen">
         <AppControllerProvider>
            <ThemeProvider>
               <AuthProvider>
                  <Routes />
               </AuthProvider>
            </ThemeProvider>
         </AppControllerProvider>
      </div>
   );
}

export default App;
