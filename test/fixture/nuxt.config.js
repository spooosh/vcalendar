const resolve = require('path').resolve;

const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    render: {
        resourceHints: false
    },

    head: {
        title: 'VueCalendar',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap&subset=cyrillic'
            }
        ]
    },

    plugins: ['~plugins/vcalendar'],

    modules: [
        '@nuxtjs/style-resources'
    ],

    css: [
        resolve(__dirname, './assets/scss/common.scss')
    ],

    styleResources: {
        scss: '../../src/scss/shared/*.scss'
    },

    build: {
        babel: {
            plugins: [
                ['@babel/plugin-proposal-optional-chaining']
            ]
        },


        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });

                config.plugins.push(
                    new StyleLintPlugin({
                        files: ['**/*.scss', '**/*.vue'],
                        failOnError: false,
                        quiet: false
                    })
                );
            }

        }
    }
};