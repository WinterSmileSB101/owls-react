/* eslint-disable import/prefer-default-export */
import path from 'path';
import { PageAlias, PageMapping, ModuleRoot } from './config.type';

export default {
    [PageAlias.HomeHome]: path.join(ModuleRoot.home, 'pages/home/home-page.tsx'),
    [PageAlias.HomeApp]: path.join(ModuleRoot.home, 'app.tsx'),
} as PageMapping;
