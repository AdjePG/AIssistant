import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
			'xxs': '450px', 
			'xs': '540px', 
			'sm': '640px',
			'md': '768px',
			'md-lg': '908px',
			'lg': '1024px',
			'xl': '1280px',
		},
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        hover: "var(--hover)",
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(to right, #e02573, #227cd1)',
      },
    },
  },
  plugins: [],
};
export default config;
