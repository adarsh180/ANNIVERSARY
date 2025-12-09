import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark romantic theme colors
        charcoal: {
          DEFAULT: '#0a0a0a',
          50: '#1a1a1a',
          100: '#151515',
          200: '#121212',
          300: '#0f0f0f',
          400: '#0c0c0c',
          500: '#0a0a0a',
        },
        rose: {
          glow: '#8b1a3d',
          deep: '#6b1630',
          light: '#a91e4a',
          muted: '#4a1025',
        },
        gold: {
          glow: '#d4a853',
          light: '#e8c97a',
          muted: '#8b7340',
          star: '#ffd700',
        },
        cream: '#f5f0e8',
        paper: '#faf8f3',
        // Neon colors
        neon: {
          pink: '#ff2d92',
          cyan: '#00f5ff',
          purple: '#bf5af2',
          rose: '#ff6b9d',
          gold: '#ffd700',
          blue: '#0a84ff',
        },
      },
      fontFamily: {
        handwritten: ['"Caveat"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 1.2s linear infinite',
        'typewriter': 'typewriter 0.1s steps(1) forwards',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 3s infinite',
        'aurora': 'aurora 15s ease infinite',
        'fire-burst': 'fire-burst 1s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 45, 146, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 45, 146, 0.6)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-romantic': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'gradient-neon': 'linear-gradient(135deg, #ff2d92 0%, #bf5af2 50%, #00f5ff 100%)',
        'gradient-neon-rose': 'linear-gradient(135deg, #ff2d92 0%, #ff6b9d 100%)',
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 45, 146, 0.4), 0 0 40px rgba(255, 45, 146, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.2)',
        'neon-purple': '0 0 20px rgba(191, 90, 242, 0.4), 0 0 40px rgba(191, 90, 242, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;
