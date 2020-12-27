/* eslint-disable no-shadow */
export enum PageAlias {
    HomeHome = 'HomeHome',
    HomeApp = 'HomeApp',
}

export enum ModuleRoot {
    home = './src/modules/home',
}

export type PageMapping = {
    [key: string]: string;
};

export type PageMappingConfig = {
    name: string;
    path: string;
};
