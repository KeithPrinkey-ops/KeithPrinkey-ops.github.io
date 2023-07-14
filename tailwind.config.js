/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './about.html',
    '/contact.html',
    './disclaimer.html',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#00ff00',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
      },
    },
  },
  plugins: [],
};


