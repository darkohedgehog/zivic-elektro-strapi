module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-animation": {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient": "gradient-animation 15s ease infinite",
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(270deg, #dbdaea, #dcdcdc, #c0c0c0)', // lavender, stone, platinum
        'gradient-dark': 'linear-gradient(270deg, #1b1b1b, #0a0a3d, #1f003d)', // space effect with black, blue, and purple shades
      },
      colors: {
        dark: "#1b1b1b",
        light: "#fff",
        accent: "#7B00D3",
        accentDark: "#9f86c0",
        gray: "#747474",
        darkblue: '#0a192f',
        darkpurple: '#6a0dad',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
