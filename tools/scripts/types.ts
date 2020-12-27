/* eslint-disable import/no-unresolved */
import webpack from 'webpack';
import { Configuration } from 'webpack-dev-server';

export type SupportConfigExtension = {
    extension: string;
    specialConfigNode?: string;
};

export type UnionWebpackConfigWithDevelopmentServer = webpack.Configuration & Configuration;
