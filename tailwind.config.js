/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Default theme colors
        primary: "#C04000",
        body: "#FFF8F5",
        border: "#D4A574",
        "theme-light": "#F5E6D3",
        "theme-dark": "#2C1810",
        
        // Default text colors
        "text-default": "#4A3426",
        "text-dark": "#2C1810",
        "text-light": "#8B6F47",
        
        // Dark mode theme colors
        "dark-primary": "#E85A4F",
        "dark-body": "#1A0F0A",
        "dark-border": "#6B4423",
        "dark-theme-light": "#3D2817",
        "dark-theme-dark": "#F5E6D3",
        
        // Dark mode text colors
        "dark-text-default": "#C4A484",
        "dark-text-dark": "#F5E6D3",
        "dark-text-light": "#E8D5C0",
      },
      fontFamily: {
        primary: ['Nunito', 'sans-serif'],
        secondary: ['Crimson Text', 'serif'],
      },
      fontSize: {
        'xs': '0.64rem',    // 16 * 1.250^-2
        'sm': '0.8rem',     // 16 * 1.250^-1
        'base': '1rem',     // 16px
        'lg': '1.25rem',    // 16 * 1.250^1
        'xl': '1.563rem',   // 16 * 1.250^2
        '2xl': '1.953rem',  // 16 * 1.250^3
        '3xl': '2.441rem',  // 16 * 1.250^4
        '4xl': '3.052rem',  // 16 * 1.250^5
        '5xl': '3.815rem',  // 16 * 1.250^6
      },
    },
  },
  plugins: [],
}