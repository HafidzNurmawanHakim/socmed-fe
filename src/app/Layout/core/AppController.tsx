import {
   Dispatch,
   FC,
   SetStateAction,
   createContext,
   useContext,
   useEffect,
   useState,
} from "react";

type AppControllerProps = {
   openPanel: boolean;
   setOpenPanel: Dispatch<SetStateAction<boolean>>;
   isSticky: boolean;
   setIsSticky: Dispatch<SetStateAction<boolean>>;
};

interface AppControllerProviderProps {
   children: React.JSX.Element | undefined;
}

const initAppController = {
   openPanel: true,
   setOpenPanel: () => {},
   isSticky: false,
   setIsSticky: () => {},
};

const AppControllerContext = createContext<AppControllerProps>(initAppController);

const useAppController = () => {
   return useContext(AppControllerContext);
};

const AppControllerProvider: FC<AppControllerProviderProps> = ({ children }) => {
   const [openPanel, setOpenPanel] = useState<boolean>(true);
   const [isSticky, setIsSticky] = useState(false);

   useEffect(() => {
      const mainSection = document.getElementById("main-section");
      if (!mainSection) return;

      const handleScroll = () => {
         if (mainSection.scrollTop > 80) {
            setIsSticky(true);
         } else {
            setIsSticky(false);
         }
      };

      mainSection.addEventListener("scroll", handleScroll);
      return () => {
         mainSection.removeEventListener("scroll", handleScroll);
      };
   }, [isSticky]);

   return (
      <AppControllerContext.Provider value={{ openPanel, setOpenPanel, isSticky, setIsSticky }}>
         {children}
      </AppControllerContext.Provider>
   );
};

export { AppControllerProvider, useAppController };
