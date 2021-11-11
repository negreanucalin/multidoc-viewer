const mix = require('laravel-mix');
require('vuetifyjs-mix-extension');
require('mix-html-builder');

mix.js('resources/js/app.js', 'public/js').vuetify('vuetify-loader').vue()
    .sass('resources/sass/app.scss', 'public/css');

if (mix.inProduction()) {
    mix.version();
}

mix.html({
    htmlRoot: './resources/index.php', // Your html root file(s)
    output: '/', // The html output folder
    inject:true,
    minify: {
        removeComments: true
    }
});
