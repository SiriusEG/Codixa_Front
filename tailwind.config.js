/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: ["Poppins"],
      sec: ["Roboto"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#20B486",
          100: "#01623c",
          background: "#F0F6F5",
        },
        secondary: {
          DEFAULT: "#177658",
        },
        gray: {
          10: "#98a2b3",
        },
        light: {
          10: "#fdf2fa",
        },
      },
      spacing: {
        15: "3.75rem",
        88: "22rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite alternate-reverse",
      },
      screens: {
        ph: { max: "420px" },
        sm: "640px",
        "m-sm": { max: "640px" },
        md: "768px",
        "m-md": { max: "768px" },
        "m-lg": { max: "992px" },
        lg: "1024px",
        "m-lg2": { max: "1024px" },
        xl: "1280px",
        "m-xl": { max: "1280px" },
        "2xl": "1536px",
        "m-2xl": { max: "1536px" },
        custom1: { max: "1185px" }, // made for the nav
        custom2: "1123px", // made for the nav
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        html: {
          scrollBehavior: "smooth",
          fontSize: "16px", // default
          "@media (max-width: 1536px)": { fontSize: "15px" }, // max 2xl
          "@media (max-width: 1280px)": { fontSize: "14px" }, // max xl
          "@media (max-width: 1024px)": { fontSize: "12px" }, // max lg
          "@media (max-width: 768px)": { fontSize: "10px" }, // max md
          "@media (max-width: 450px)": { fontSize: "9px" }, // phone screen
        },
        ".text-truncate": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        },
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  ],
  corePlugins: {
    textOpacity: false,
    ringOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    backdropOpacity: false,
    backgroundOpacity: false,
    placeholderOpacity: false,
  },
};

//yasser used colors settings
/*
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
       */
