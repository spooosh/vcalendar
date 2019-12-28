import scss from 'rollup-plugin-scss';

import vue from 'rollup-plugin-vue';

import babel from 'rollup-plugin-babel';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';

import {terser} from 'rollup-plugin-terser';

import replace from 'rollup-plugin-replace';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
    input: 'src/index.js', // Путь до относительного package.json
    output: {
        name: 'index',
        exports: 'named'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        scss({
            prefix: '@import "./src/shared/_variables.scss";'
        }),
        resolve({
            mainFields: ['jsnext:main', 'main'],
            browser: true
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        commonjs({
            experimentalDynamicImport: true
        }),
        vue({
            css: true,
            styleToImports: true,
            compileTemplate: true,
            template: {
                isProduction: true
            }
        }),
        buble({
            transform: {modules: true}
        })
    ]
};

if (argv.format === 'iife') {
    config.plugins.push(terser());
}

export default config;