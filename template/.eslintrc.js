module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ["./eslint-config-lilletom.js", "plugin:vue/essential"],
	parserOptions: {
		parser: "babel-eslint",
		sourceType: "module"
	},
	plugins: ["vue"],
	rules: {}
};