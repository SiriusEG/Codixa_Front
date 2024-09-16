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
        secondary: "#177658",
        gray: {
          10: "#98a2b3",
        },
        light: {
          10: "#fdf2fa",
        },
      },

      transitionDuration: {
        DEFAULT: "200ms",
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

/*
            // DEFAULT: "#274B3A",
            // 20: "#667085",
// 10: "#eaecf0",
            // 20: "#f2f4f7",
        //   dark: {
        //     10: "#101828",
        //   },
        // },
        // flex: {
        //   auto: "0 0 auto",
        // },
        // keyframes: {
        //   pulse: {
        //     "0%, 100%": {
        //       opacity: 1,
        //     },
        //     "50%": {
        //       opacity: 0.5,
        //     },
        //   },
        // },
*/

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
