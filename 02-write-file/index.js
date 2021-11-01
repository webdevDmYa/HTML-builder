const fs = require('fs');
const process = require('process');
const readline = require('readline');
const path = require('path');
const stdout = process.stdout;
const stdin = process.stdin;
let content;
const rl = readline.createInterface(stdin);
const stream = fs.createReadStream(__filename);
stream.on('open', function () {
	rl.on('line', (input) => {
		if (input === 'exit') {
			console.log('Bye! Thanks you!')
			rl.close();
		}
	});
	stdout.write('Welcome! Write you text:\n');
	stdin.on('data', (data) => {
		content = data.toString();
		fs.open(path.dirname('text.txt'), 'a+', (err) => {
			if (err) throw err;
			fs.appendFile(path.join(__dirname, 'text.txt'), content, (err) => {
				if (err) throw err;
			})
		});
		function handle() {
			console.log('Thanks you!\nGood Luck my friend!');
			process.exit();
		}
		process.on('SIGINT', handle);
	});

})
