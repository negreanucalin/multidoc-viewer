const mix = require('laravel-mix');
require('vuetifyjs-mix-extension');

mix.setPublicPath('.')

mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader').vue()
    .sass('resources/sass/app.scss', 'public/css');

if (mix.inProduction()) {
    mix.version();
}