import path from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import ProjectConfig from './project.const';

const fixedPlugins = [
    new CleanWebpackPlugin(),

    new ForkTsCheckerWebpackPlugin({
        typescript: {
            configFile: path.resolve(ProjectConfig.PROJECT_PATH, './tsconfig.json'),
        },
    }),
];

export default {
    fixedPlugins,
};
