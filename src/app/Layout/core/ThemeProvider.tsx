import { FC, createContext, useContext, useEffect, useState } from "react";

type ThemeContextProps = {
   isDarkTheme: boolean;
   themeToggle: () => void;
};

interface ThemeProviderProps {
   children?: JSX.Element | JSX.Element[];
}

const initThemeContextProps = {
   isDarkTheme: false,
   themeToggle: () => {},
};

const ThemeContext = createContext<ThemeContextProps | undefined>(initThemeContextProps);

const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be use within  a Theme Provider!");
   }
   return context;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
   const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

   useEffect(() => {
      initialThemeHandler();
   }, []);

   function isThemeEmpty() {
      return !localStorage.getItem("iDarkTheme");
   }

   function initialThemeHandler() {
      if (isThemeEmpty()) {
         localStorage.setItem("isDarkTheme", "true");
         document!.querySelector("body")!.classList.add("dark");
         setIsDarkTheme(true);
      } else {
         const isDarkTheme: boolean = JSON.parse(localStorage.getItem("isDarkTheme")!);
         isDarkTheme && document!.querySelector("body")?.classList.add("dark");
         setIsDarkTheme(() => {
            return isDarkTheme;
         });
      }
   }

   function themeToggle() {
      const isDarkTheme: boolean = JSON.parse(localStorage.getItem("isDarkTheme")!);
      setIsDarkTheme(!isDarkTheme);
      toggleClassToBody();
   }

   function toggleClassToBody() {
      document!.querySelector("body")!.classList.toggle("dark");
   }

   function setValueToLocalStorage() {
      localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
   }

   return <ThemeContext.Provider value={initThemeContextProps}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, useTheme };
