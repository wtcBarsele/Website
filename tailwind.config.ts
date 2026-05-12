import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        barsele: {
          // Elektrisch, levendig blauw — geïnspireerd op de clubkleuren
          blue: {
            50:  '#eef2ff',
            100: '#d8e3ff',
            200: '#b3c8ff',
            300: '#7da3ff',
            400: '#4a7aff',
            500: '#2060ff',
            600: '#1650f0',
            700: '#1245d0',
            800: '#1038a8',
            900: '#112e82',
            950: '#0b1d52',
          },
          // Diep marineblauw — sportiever dan pikzwart
          ink: '#08111f',
          // Sportieve accenten
          red: '#d91a2a',
          yellow: '#f5c000',
          // Lichte achtergrondtinten
          mist: '#f4f6fb',
          cloud: '#e8ecf5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(8,17,31,0.04), 0 8px 24px rgba(8,17,31,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
