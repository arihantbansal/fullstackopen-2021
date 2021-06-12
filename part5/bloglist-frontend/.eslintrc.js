/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es6: true,
		"jest/globals": true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:cypress/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: "module",
	},
	plugins: ["react", "jest"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		eqeqeq: ["error", "always"],
		"no-trailing-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
		"react/prop-types": 0,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
