import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: {
					10: "rgba(230, 87, 255, 0.15)",
					80: "rgba(230, 87, 255, 0.80)",
					default: "var(--accent)",
					dark: "var(--accent-dark)",
				},
				l_yellow: "#f4f2ec",
			},
			boxShadow: {
				main: "0px 5px var(--accent)",
			},
			fontFamily: {
				dmSans: ["var(--font-dm-sans)"],
				nohemi:["var(--font-nohemi)"],
				inter:["var(--font-inter)"]
			},
		},
	},
	plugins: [],
} satisfies Config;
