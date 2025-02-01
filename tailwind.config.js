/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#DD2B2B',
  			'primary-dark': '#00B4B4'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};