import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Barsele huiskleuren
        barsele: {
          // Diep, sportief blauw — de hoofdkleur voor knoppen, links, accenten
          blue: {
            50: '#eef6ff',
            100: '#d9eaff',
            200: '#bcdaff',
            300: '#8dc1ff',
            400: '#569dff',
            500: '#2f7dff',
            600: '#1860ed',
            700: '#144bc4',
            800: '#163f9a',
            900: '#17387a',
            950: '#10234d',
          },
          // Bijna-zwart voor tekst en sterke accenten — niet pikzwart zodat het rust geeft
          ink: '#0e1525',
          // Lichte achtergrondtinten
          mist: '#f5f7fb',
          cloud: '#eaeef6',
        },
      },
      fontFamily: {
        // Sportief, modern. Werkt zonder externe downloads via Google Fonts (zie layout.tsx)
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,21,37,0.04), 0 8px 24px rgba(14,21,37,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
