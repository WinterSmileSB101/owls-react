import postCssFlexBugsFix from 'postcss-flexbugs-fixes';
import postCssPresetEnv from 'postcss-preset-env';
import postCssNormalize from 'postcss-normalize';
import { RuleSetUseItem } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import AllConst from '../const';

const { IS_DEV } = AllConst.ProjectConfig;

const getCssLoader = (importLoaders: number): RuleSetUseItem[] => [
    IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: false,
            sourceMap: IS_DEV,
            importLoaders,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                postCssFlexBugsFix(), // require('postcss-flexbugs-fixes'),
                postCssPresetEnv({
                    autoprefixer: {
                        grid: true,
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }), // require('postcss-preset-env')({
                postCssNormalize(), // require('postcss-normalize'),
            ],
            sourceMap: true,
        },
    },
];

export default {
    getCssLoader,
};
