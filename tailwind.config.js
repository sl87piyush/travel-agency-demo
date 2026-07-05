/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        indigo: '#163A5C',
        cerulean: '#2F6690',
        marigold: '#E8A33D',
        rust: '#B0532E',
        sandstone: '#F6EFE2',
        ink: '#211F1B',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        lift: '0 24px 60px -30px rgba(22,58,92,.42)',
        soft: '0 10px 30px -18px rgba(33,31,27,.26)',
      },
    },
  },
  plugins: [],
}
