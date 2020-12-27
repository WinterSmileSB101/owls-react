/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import common from './webpack.common';
import { UnionWebpackConfigWithDevelopmentServer } from '../types';
import proxy from '../../../config/proxy';

import AllConst from '../const';

const { SERVER_HOST, SERVER_PORT } = AllConst.ServerConfig;

const developmentConfig: UnionWebpackConfigWithDevelopmentServer = merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'silent',
        compress: true,
        open: true,
        hot: true,
        proxy: { ...proxy },
    },
});

export default developmentConfig;
