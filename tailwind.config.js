/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-0': '#0B0C0E',
        'bg-1': '#121318',
        stroke: 'rgba(255,255,255,0.08)',
        'text-primary': 'rgba(255,255,255,0.92)',
        'text-secondary': 'rgba(255,255,255,0.72)',
        'text-muted': 'rgba(255,255,255,0.55)',
        'neon-a': '#7C5CFF',
        'neon-b': '#00D4FF',
        'neon-c': '#00FFA3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'h1': ['clamp(3rem, 5vw, 5rem)', { lineHeight: '1.1' }],
        'h2': ['clamp(2.25rem, 3vw, 3rem)', { lineHeight: '1.2' }],
        'h3': ['clamp(1.5rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.8125rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(124, 92, 255, 0.15)',
        'glow-neon': '0 0 30px rgba(124, 92, 255, 0.25), 0 0 60px rgba(0, 212, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
