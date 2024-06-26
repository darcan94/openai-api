import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "80": "80%",
      },
      colors: {
        'primary': 'var(--primary)',
        'secondary':  'var(--secondary)',
        'secondary-alpha':  'var(--secondary-alpha)',
        'background': 'var(--background)',
        'background-alpha': 'var(--background-alpha)',
        'font': 'var(--foreground)',
        'primary-500': 'var(--primary-500)',
        'primary-300': 'var(--primary-300)',
        'danger': 'var(--danger)',
        'highlight': 'var(--highlight)',
        'disabled': {
          DEFAULT: '#F8F8F9',
          dark: '#26262C',
        }
      },
      gradientColorStopPositions: {
        11: '11%',
        87: '87%'
      }
    },

    keyframes: {
      'slide-from-left': {
        '0%': {
          transform: 'translateX(-100%)'
        },
        '100%': {
          transform: 'translateX(0)'
        }
      },
      'slide-to-left': {
        '0%': {
          transform: 'translateX(0)'
        },
        '100%': {
          transform: 'translateX(-100%)'
        }
      }
    },
    animation: {
      'slide-from-left':
        'slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
      'slide-to-left':
        'slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
    }
  }
};
export default config;
