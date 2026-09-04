/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        accent: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        ink: {
          950: '#08080A',
          900: '#0B0B0D',
          800: '#121214',
          700: '#18181B',
          600: '#212124',
          500: '#2C2C30',
        },
        paper: {
          DEFAULT: '#ECEBE6',
          dim: '#B8B7B1',
          faint: '#7A7A76',
        },
        accent: {
          DEFAULT: '#93AFA8',
          dim: '#5E756F',
          bright: '#B4CBC5',
        }
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        widest: '0.2em',
        ultra: '0.35em',
      }
    },
  },
  plugins: [],
}
