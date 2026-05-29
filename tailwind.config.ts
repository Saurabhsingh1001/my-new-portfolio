import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm)', 'DM Sans', 'sans-serif'],
        space: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      colors: {
        accent: '#6c63ff',
        accent2: '#00d4aa',
      },
    },
  },
  plugins: [],
}

export default config
