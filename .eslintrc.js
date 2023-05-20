module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "airbnb/hooks",
    "prettier",
    "prettier/react"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // allow .js files to contain JSX code
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],

    // prevent eslint to complain about the "styles" variable being used before it was defined
    "no-use-before-define": ["error", { "variables": false }],

    // ignore errors for the react-navigation package
    "react/prop-types": ["error", {"ignore": ["navigation", "navigation.navigate"]}]
  }
};
