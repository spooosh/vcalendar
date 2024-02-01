const babel = require('@rollup/plugin-babel');
const cleanup = require('rollup-plugin-cleanup');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const terser = require('@rollup/plugin-terser');

const {rollup} = require('rollup');

async function build(options) {
    const bundle = await rollup({
        input: 'src/index.js',
        plugins: [
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            resolve({
                mainFields: ['jsnext:main', 'main'],
                browser: true,
            }),
            commonjs({
                experimentalDynamicImport: true,
            }),
            babel.getBabelOutputPlugin({
                presets: [
                    '@babel/preset-env',
                ],
                plugins: [
                    '@babel/plugin-proposal-optional-chaining',
                ],
            }),
            vue({
                compileTemplate: true,
                compilerOptions: {
                    whitespace: 'condense',
                },
                template: {
                    isProduction: true,
                    optimizeSSR: Boolean(options.ssr),
                },
                preprocessStyles: true,
                preprocessOptions: {
                    scss: {
                        additionalData: '@import "./src/shared/_variables.scss";',
                    },
                },
            }),
            !options.ssr && terser(),
            cleanup(),
        ],
    });

    await bundle.write({
        format: options.ssr ? 'cjs' : 'esm',
        dir: './dist',
        entryFileNames: `index.${options.ssr ? 'cjs.' : 'esm.'}js`,
        exports: 'named',
    });

    await bundle.close();
}

(async function () {
    await build({ssr: true});
    await build({ssr: false});
})();

// if (argv.format === 'iife') {
//     config.plugins.push(terser());
// }
