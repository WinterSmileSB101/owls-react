module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-config-prettier', // fix conflict with prettier,need install stylelint-config-prettier, must in last
    ],
    plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
    rules: {
        'plugin/stylelint-declaration-block-no-ignored-properties': true,
        'comment-empty-line-before': null,
        'declaration-empty-line-before': null,
        'function-name-case': null,
        'no-descending-specificity': null,
        'no-invalid-double-slash-comments': null,
        'rule-empty-line-before': 'always',
    },
    ignoreFiles: ['node_modules/**/*', 'build/**/*'],
};
