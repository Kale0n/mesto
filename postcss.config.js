const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключите плагины к PostCSS
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
}; 