/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import glob from 'glob-all';
import PurgeCSSPlugin from 'purgecss-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.common';
import { UnionWebpackConfigWithDevelopmentServer } from '../types';
import AllConst, { WebpackConfig } from '../const';

const { PROJECT_PATH } = AllConst.ProjectConfig;

const productionConfig: UnionWebpackConfigWithDevelopmentServer = merge(common, {
    // devtool: 'none',
    mode: 'production',
    plugins: [
        ...WebpackConfig.fixedPlugins,
        new PurgeCSSPlugin({
            paths: glob.sync(
                [
                    `${path.resolve(PROJECT_PATH, './src')}/**/*.{ts,tsx,scss,less,css}`,
                    `${path.resolve(PROJECT_PATH, './public')}/**/*.html`,
                ],
                { nodir: true },
            ),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[contenthash:8].css',
            chunkFilename: 'static/styles/[name].[contenthash:8].css',
            ignoreOrder: false,
        }),
        new webpack.BannerPlugin({
            raw: true,
            banner: '/** @preserve Powered by owls */',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // static mode
            reportFilename: './dist/analyzer/report.html',
        }),
    ],
});

export default productionConfig;
