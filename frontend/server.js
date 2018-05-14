var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');

var port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
	var config = require('./webpack.config.dev');
	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		historyApiFallback: true
	}).listen(port, '0.0.0.0', function (err, result) {
		if (err) {
			console.log(err);
		}

		console.log('Listening at localhost:' + port);
	});
} else {
	webpack(require('./webpack.config'), function(err, stats) {
		console.log("built webpack");
	});

	var app = express();

	var server = app.listen(port, function() {
		var host = server.address().address;
		var port = server.address().port;

		app.use('/static', express.static('dist'));

		app.get('*', function(req, res) {
			res.sendFile('index.html', {root: __dirname});
		});

		console.log('Listening at http://%s:%s', host, port);
	});
}
