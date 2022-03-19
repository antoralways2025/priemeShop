
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
 
    extend: {
      colors:{
        dark:{
          DEFAULT:"#0a0b1e",
          100:"#0a0b0e",
          200:"#16181d",
          300:"#16181d",
          500:"#0f1115",
          700:"#202125",
          
  
      }
      }
    },
  },
  plugins: [],
}