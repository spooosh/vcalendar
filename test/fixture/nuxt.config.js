import { resolve } from 'path';
import sass from 'sass';

module.exports = {
    alias: {
        '~': resolve(__dirname, '../..'),
    },

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
        '@nuxtjs/style-resources',
    ],

    css: [
        resolve(__dirname, './assets/scss/common.scss'),
    ],

    styleResources: {
        scss: '../../src/scss/shared/*.scss',
    },

    build: {
        postcss: false,

        loaders: {
            sass: { implementation: sass },
            scss: { implementation: sass },
            vue: {
                prettify: false,
            },
        },
    },
};
