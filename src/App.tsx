import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppControllerProvider } from "./app/Layout/core/AppController";
import MasterLayout from "./app/Layout/core/MasterLayout";
import { ThemeProvider } from "./app/Layout/core/ThemeProvider";
import { AuthProvider } from "./app/auth/core/AuthProvider";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <div className="h-screen w-screen">
         <AppControllerProvider>
            <ThemeProvider>
               <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
               />
               <AuthProvider>
                  <Routes />
               </AuthProvider>
            </ThemeProvider>
         </AppControllerProvider>
      </div>
   );
}

export default App;
