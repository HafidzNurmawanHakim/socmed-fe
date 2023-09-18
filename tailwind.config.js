const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            teal: "#00ADB5",
            darkerTeal: "#286372",
            darker: "#16191b",
            dark: "#1c1f22",
            lessWhite: "#f5f5f5",
            softRed: "#ED2B2A",
            light: "#bbb",
         },
         backgroundImage: {
            login: "url('/public/images/dark-bg.jpg')",
         },
         screens: {
            "3xl": "1900px",
         },
      },
   },
   darkMode: "class",
   plugins: [require("daisyui"), nextui()],
};
