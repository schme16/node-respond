let respond = require(__dirname + '/../main.js');

respond('npm', ['init'])
	.on(new RegExp('package name:', 'igm'), 'awesome_package')
	.on('version:', '0.0.1')
	.on('description:', "It's an awesome package man!")
	.on('entry point:', "")
	.on('test command:', 'npm test')
	.on('git repository:', "")
	.on('keywords:', 'awesome, cool')
	.on('author:', 'Shane Gadsby')
	.on('license:', 'MIT')
	.on('is this OK?', 'yes')
	.error((err) => {
		console.log(err.message);
	})
	.end((code) => {
		console.log('Exit code: ', code)
	})