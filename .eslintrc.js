module.exports = {
    env: {
        node: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'warn',
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
