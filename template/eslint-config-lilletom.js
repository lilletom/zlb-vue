module.exports = {
	extends: "eslint:recommended",
	env: {
		browser: true,
		es6: true,
		node: true
	},
	rules: {
		"no-console": "off",
		"no-unused-vars": "off",
		"indent": "off",
		quotes: ["warn", "double"]
	}
};