module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    function () {
      console.log("PostCSS config loaded!");
    }
  ],
};
