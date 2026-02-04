import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          400: '#94a3b8',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        sky: {
          500: '#0ea5e9',
          400: '#38bdf8',
        },
        indigo: {
          500: '#6366f1',
          400: '#818cf8',
        },
        emerald: {
          500: '#10b981',
          400: '#34d399',
        },
      },
    },
  },
  plugins: [],
};

export default config;