import path from 'path';

// eslint-disable-next-line no-shadow
export enum EnvironmentAlias {
    nodeEnvironment = 'NODE_ENV',
}

const IS_DEV = process.env.NODE_ENV !== 'production';

const PROJECT_PATH = path.resolve(__dirname, '../../../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
const PROJECT_STATIC_PATH = path.join(path.parse(PROJECT_PATH).dir, './static');

export default {
    IS_DEV,
    PROJECT_PATH,
    PROJECT_NAME,
    PROJECT_STATIC_PATH,
};
