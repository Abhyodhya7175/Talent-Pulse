/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Class: font-space (For your Welcome banner)
        space: ['"Space Grotesk"', 'sans-serif'],
        
        // Class: font-playwrite (For specific accents/handwritten style)
        playwrite: ['"Playwrite NZ Basic"', 'cursive'],

        climate: ['"Climate Crisis"', 'cursive'],

        heading: ['Sora', 'sans-serif'],
        
        // Class: font-body (For general text)
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}