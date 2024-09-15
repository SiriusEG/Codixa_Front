/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#20B486", // Main brand color
        secondary: "#01623C", // Darker variant for buttons, or hover states
        accent: "#6DB66B", // Highlight or accent color (with opacity)

        primaryBackground: "#F0F6F5", // Soft background color
        secondaryBackground: "#EBF5FF", // Light accent or background variant

        hoverPrimary: "#1B895B", // Hover state for primary
        mutedPrimary: "#20B4868A", // Muted version of primary (with opacity)
        hoverSecondary: "#177658", // Hover state for secondary
      },
    },
  },
  plugins: [],
};
