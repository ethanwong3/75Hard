// eslint.config.js
const babelParser = require("@babel/eslint-parser").default;
const reactPlugin = require("eslint-plugin-react");

module.exports = [
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      // Define globals to mimic common Node and browser environments.
      globals: {
        __dirname: "readonly",
        module: "writable",
        require: "readonly",
        process: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      indent: ["error", 2],
      // Add additional rules as needed
    },
  },
];
