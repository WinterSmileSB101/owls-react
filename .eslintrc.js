const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier', // fix conflict with prettier,need install eslint-config-prettier, must in last
        'prettier/@typescript-eslint', // fix conflict with prettier,need install eslint-config-prettier, must in last
        'prettier/react', // fix conflict with prettier,need install eslint-config-prettier, must in last
        'prettier/unicorn', // fix conflict with prettier,need install eslint-config-prettier, must in last
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.tsx', '.ts', '.js', '.json'],
            },
        },
    },
    plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],
    rules: {
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never',
            },
        ],
        // remove strict check of dependcies
        'import/no-extraneous-dependencies': [
            ERROR,
            {
                devDependencies: true,
            },
        ],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'array-callback-return': [
            ERROR,
            {
                allowImplicit: true,
            },
        ],
        'no-param-reassign': [false],
        'global-require': [false],
        'import/no-dynamic-require': [false],
        'plugin/stylelint-declaration-block-no-ignored-properties': [1],
    },
};
