module.exports = {
	dirName: __dirname,
	uiPath: '/',
	expressMiddleware: [
		function (express) {
			return ['/public', express.static(__dirname + '/public')];
		}
	],
	open: true,
	tunnel: {
		protocol: 'http',
		host: 'localhost',
		port: 3333
	}
}
