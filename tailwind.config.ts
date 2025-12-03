import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        'inter': ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], // Overriding inter to map to our new font
        'space-grotesk': ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], // Overriding space-grotesk
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
        DEFAULT: '0px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: '#171717', // neutral-900
          foreground: '#e5e5e5', // neutral-200
        },
        popover: {
          DEFAULT: '#171717', // neutral-900
          foreground: '#e5e5e5', // neutral-200
        },
        primary: {
          DEFAULT: '#EB0028',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#262626', // neutral-800
          foreground: '#e5e5e5', // neutral-200
        },
        muted: {
          DEFAULT: '#262626', // neutral-800
          foreground: '#a3a3a3', // neutral-400
        },
        accent: {
          DEFAULT: '#5EEAD4', // teal-400
          foreground: '#0a0a0a',
        },
        destructive: {
          DEFAULT: '#EB0028',
          foreground: '#FFFFFF',
        },
        border: '#262626', // neutral-800
        input: '#171717', // neutral-900
        ring: '#5EEAD4', // teal-400

        // TEDx Brand Colors
        'tedx': {
          red: '#EB0028',
          'red-dark': '#c41e0f',
          'red-darker': '#c71b23',
        },

        // Accent Colors
        'teal': {
          DEFAULT: '#5EEAD4',
          light: '#2DD4BF',
          400: '#5EEAD4',
        },

        // Background Neutrals (keeping Tailwind defaults)
        'neutral': {
          950: '#0a0a0a',
          900: '#171717',
          800: '#262626',
          700: '#404040',
          600: '#525252',
          500: '#737373',
          400: '#a3a3a3',
          300: '#d4d4d4',
          200: '#e5e5e5',
          100: '#f5f5f5',
        },

        // Gold for roles/icons
        'yellow': {
          500: '#eab308',
        },

        // Sponsorship Tier Colors
        'sponsor': {
          title: '#FFD700',      // Gold
          diamond: '#E5E7EB',    // Light Gray
          platinum: '#9CA3AF',   // Medium Gray
          gold: '#FCD34D',       // Yellow Gold
          silver: '#94A3B8',     // Silver Gray
        },
      },
      backgroundImage: {
        'none': 'none',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(94, 234, 212, 0.4)',
        'lift': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
