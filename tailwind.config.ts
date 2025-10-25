import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: {
          DEFAULT: "#2E7D32",
          hover: "#1B5E20",
        },
        brandBlue: {
          DEFAULT: "#1565C0",
          hover: "#0D47A1",
        },
        brandGreenHover: "#1B5E20",
        brandBlueHover: "#0D47A1",
        brandDark: "#1A1A1A",
        brandGray: "#6B7280",
        brandLightGray: "#F9FAFB",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(46, 125, 50, 0.1), 0 2px 4px -1px rgba(46, 125, 50, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(46, 125, 50, 0.1), 0 4px 6px -2px rgba(46, 125, 50, 0.05)',
      },
    },
  },
  plugins: [],
}

export default config
