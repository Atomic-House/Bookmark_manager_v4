/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
//--------------Colors--------------------
// LightMode colors
// 'text': '#022616',
// 'background': '#ffffff',
// 'primary-button': '#96f5f8',
// 'secondary-button': '#ddecfd',
// 'accent': '#368ef2',
// _______________________________
// _______________________________
//Darkmode colors
// 'text': '#daf7e1',
// 'background': '#010402',
// 'primary-button': '#311970',
// 'secondary-button': '#000000',
// 'accent': '#703119',
