/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-extra-boolean-cast */
import fs from 'fs';
import path from 'path';
import { merge } from 'webpack-merge';

import CliUtil from './cli.util';
import AllConst from '../const';
import { EnvironmentAlias } from '../const/project.const';
import { SupportConfigExtension } from '../types';

const { PROJECT_PATH } = AllConst.ProjectConfig;

const supportConfigExtensions: SupportConfigExtension[] = [
    {
        extension: 'ts',
        specialConfigNode: 'default',
    },
    {
        extension: 'js',
        specialConfigNode: 'default',
    },
    {
        extension: 'json',
    },
];

const mergeConfig = (baseConfig, overrideConfig) => merge(baseConfig, overrideConfig);

const replaceAllSupportExtension = (configName: string): string => {
    supportConfigExtensions.forEach((sce) => {
        configName = configName.replace(`.${sce.extension}`, '');
    });

    return configName;
};

const getMatchExtension = (name: string, configBasePath: string, environment?: string): SupportConfigExtension => {
    if (name?.trim()?.length <= 0) {
        return undefined;
    }

    let extension;

    supportConfigExtensions.some((sce) => {
        if (!sce.extension.startsWith('.')) {
            sce.extension = `.${sce.extension}`;
        }

        const fileWithExtension = `${name}${sce.extension}`;

        const match = fs.existsSync(
            environment && environment.trim().length > 0
                ? path.join(PROJECT_PATH, configBasePath, `${environment}/${fileWithExtension}`)
                : path.join(PROJECT_PATH, configBasePath, `${fileWithExtension}`),
        );

        extension = match ? sce : extension;

        return match;
    });

    return extension;
};

const getConfig = (configName: string, configBasePath = '/config'): any => {
    if (configName === undefined || configName.trim().length <= 0) {
        return undefined;
    }

    configName = replaceAllSupportExtension(configName);

    const matchExtension = getMatchExtension(configName, configBasePath);

    const fileName = `/${configName}${matchExtension.extension}`;

    let finalConfig = !!matchExtension && require(path.join(PROJECT_PATH, configBasePath, fileName));

    const environment = CliUtil.getEnvironmentParameters(EnvironmentAlias.nodeEnvironment) || 'production';

    if (environment?.length >= 0) {
        const envMatchExtension = getMatchExtension(configName, environment);
        if (!!envMatchExtension) {
            finalConfig = mergeConfig(
                finalConfig,
                require(path.join(PROJECT_PATH, configBasePath, `/${environment}/${fileName}`)),
            );
        }
    }

    // if extension has special config node, re-get final config
    if (!!matchExtension && !!matchExtension.specialConfigNode && matchExtension.specialConfigNode.length > 0) {
        finalConfig = finalConfig[matchExtension.specialConfigNode];
    }

    return finalConfig;
};

export default getConfig;
