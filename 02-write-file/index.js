const fs = require('fs');
const process = require('process');
const path = require('path');
const stdout = process.stdout;
const stdin = process.stdin;
let content = '';
const stream = fs.createReadStream(__filename);
stream.on('open', function () {
	fs.open(path.dirname('text.txt'), 'a+', (err) => {
		if (err) throw err;
		fs.appendFile(path.join(__dirname, 'text.txt'), content, (err) => {
			if (err) throw err;
		})
		stdout.write('Welcome! Write you text:\n');
		stdin.on('data', (data) => {
			content = data.toString().trim();
			if (content === 'exit') {
				console.log('Good Bye!')
				process.exit();
			}
			fs.appendFile(path.join(__dirname, 'text.txt'), content, (err) => {
				if (err) throw err;
			})
			function handle() {
				console.log('Good Luck my friend!');
				process.exit();
			}
			process.on('SIGINT', handle);
		});
	});
})
