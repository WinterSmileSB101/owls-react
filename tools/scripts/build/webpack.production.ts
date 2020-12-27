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

const developmentConfig: UnionWebpackConfigWithDevelopmentServer = merge(common, {
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
            banner:
                '/** @preserve Powered by react-ts-quick-starter (https://github.com/vortesnail/react-ts-quick-starter) */',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // 开一个本地服务查看报告
            analyzerHost: 'localhost', // host 设置
            analyzerPort: 9628, // 端口号设置
        }),
    ],
});

export default developmentConfig;
