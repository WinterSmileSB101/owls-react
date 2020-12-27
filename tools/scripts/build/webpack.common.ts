/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';

import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

import { UnionWebpackConfigWithDevelopmentServer } from '../types';

import AllConst, { WebpackConfig } from '../const';
import AllUtils, { getConfig } from '../utils';
import { PageMapping } from './config/config.type';

const { PROJECT_PATH, IS_DEV } = AllConst.ProjectConfig;

const { getCssLoader } = AllUtils.WebpackUtils;

const getEntry = (): PageMapping => {
    const pageConfig = getConfig('page.config.ts', './tools/scripts/build/config') as PageMapping;

    const pageMapping: PageMapping = {};
    Object.keys(pageConfig).forEach((key) => {
        const value = pageConfig[key];

        if (value?.trim()?.length >= 0) {
            pageMapping[key] = path.resolve(PROJECT_PATH, pageConfig[key]);
        }
    });

    return pageMapping;
};

const chunks = getEntry();

console.log(chunks);

const config: UnionWebpackConfigWithDevelopmentServer = {
    mode: 'production',
    entry: chunks,
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoader(2),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoader(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                ],
            },
            // load css
            {
                test: /\.css$/,
                use: getCssLoader(1),
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: [/\.(ttf|woff|woff2|eot|otf)$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@libs': path.resolve(PROJECT_PATH, './src/libs'),
            '@static': path.resolve(PROJECT_PATH, './static'),
            '@config': path.resolve(PROJECT_PATH, './config'),
            '@': path.resolve(PROJECT_PATH, './src'),
        },
    },
    output: {
        path: path.resolve(PROJECT_PATH, './dist/static/scripts/'),
        filename: `[name].${IS_DEV ? '' : '[hash:8].'}js`,
    },
    plugins: [
        ...WebpackConfig.fixedPlugins,
        new HardSourceWebpackPlugin(), //only use in dev environment
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
            filename: 'index.html',
            cache: false,
            minify: IS_DEV
                ? false
                : {
                      removeAttributeQuotes: true,
                      collapseWhitespace: true,
                      removeComments: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(PROJECT_PATH, './static/assets'),
                    from: '*',
                    to: path.resolve(PROJECT_PATH, './dist/static/assets'),
                    toType: 'dir',
                },
            ],
            // copyUnmodified: true,
        }),
        new WebpackBar({
            name: IS_DEV ? 'Starting' : 'Packaging',
            color: '#fa8c16',
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }),
    ],
    optimization: {
        minimize: !IS_DEV,
        minimizer: [
            !IS_DEV &&
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: { pure_funcs: ['console.log'] },
                    },
                }),
            !IS_DEV && new OptimizeCssAssetsPlugin(),
        ].filter(Boolean),
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: 'true',
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /[/\\]node_modules[/\\]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};

export default config;
