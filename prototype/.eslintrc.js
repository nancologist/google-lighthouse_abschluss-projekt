module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'arrow-parens': ['error', 'always'],
        indent: ['error', 4],
        'jsx-quotes': ['error', 'prefer-double'],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'sort-keys': ['error', 'asc', { caseSensitive: false, 'minKeys': 2 }],
        'sort-imports': ['error', { 'ignoreCase': true }],
        'import/extensions': ['error', 'always']
    }
};
