/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
      backgroundImage: {
        hero: "url('./img/bg_hero.svg')",
      },
    },
      fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
  plugins: [],
};

// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     fontFamily: {
//       primary: 'Poppins',
//     },
//     container: {
//       padding: {
//         DEFAULT: '30px',
//         lg: '0',
//       },
//     },
//     screens: {
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1440px',
//     },
//     extend: {
//       colors: {
//         primary: '#222222',
//         secondary: '#F5E6E0',
//       },
//       backgroundImage: {
//         hero: "url('./img/bg_hero.svg')",
//       },
//     },
//   },
//   plugins: [],
// };
