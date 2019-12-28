import scss from 'rollup-plugin-scss';

import vue from 'rollup-plugin-vue';

import babel from 'rollup-plugin-babel';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';

import {terser} from 'rollup-plugin-terser';


export default {
    input: 'src/index.js', // Путь до относительного package.json
    output: {
        name: 'index',
        dir: './dist/',
        exports: 'named',
        format: 'esm'
    },
    plugins: [
        scss({
            prefix: '@import "./src/shared/_variables.scss";'
        }),
        vue({
            css: true,
            styleToImports: true,
            compileTemplate: true
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            experimentalDynamicImport: true
        }),
        buble({
            transform: {modules: true}
        }),
        terser()
    ]
};