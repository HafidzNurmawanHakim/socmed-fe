/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				teal: "#00ADB5",
				darkerTeal: "#286372",
				darker: "#16191b",
				dark: "#1c1f22",
				lessWhite: "#f5f5f5",
				softRed: "#ED2B2A",
			},
			backgroundImage: {
				login: "url('/public/images/dark-bg.jpg')",
			},
			screens: {
				"3xl": "1920px",
			},
		},
	},
	plugins: [require("daisyui")],
};
