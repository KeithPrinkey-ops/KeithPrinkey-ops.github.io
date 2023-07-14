const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.postCss('portfolio-main/css/styles.css', 'portfolio-main/dist/styles.css', [
    tailwindcss('tailwind.config.js'),
]);

mix.options({
    processCssUrls: false,
});

// Webpack config

module.exports = {
    //...
    resolve: {
        modules: [
            path.resolve(__dirname, '/portfolio-main'),
            'node_modules'
        ]
    }
}

mix.version();
