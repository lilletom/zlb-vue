const webpack = require("webpack");
const DevServer = require("webpack-dev-server");
const devConfig = require("../../build/webpack.config.dev");

const devServerOptions = devConfig.devServer;
const compiler = webpack(devConfig);
let server = new DevServer(compiler, devServerOptions);
const port = devServerOptions.port;
const host = devServerOptions.host;
server.listen(port, host, () => {
	let opts = process.argv.slice(2);
	
	// 如果未指定配置文件，使用`test/e2e/nightwatch.conf.js`
	if(opts.indexOf("--config") === -1) {
		opts = opts.concat(["--config", "test/e2e/nightwatch.conf.js"]);
	}
	
	// 需要安装cross-spawn
	const spawn = require("cross-spawn");
	// 在子进程中启动nightwatch
	const runner = spawn("./node_modules/.bin/nightwatch", opts, {
		stdio: "inherit"
	});
	
	runner.on("exit", function(code) {
		server.close();
		process.exit(code);
	});
	
	runner.on("error", function(err) {
		server.close();
		throw err;
	});
});