
const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'),
	{ recursive: true }, (err) => {
		if (err) {
			return console.error(err);
		}
	});
fs.readdir('./04-copy-directory/files', (err, files) => {
	if (err) {
		console.log(err);
	}

	files.forEach(file => {
		console.log(file)
		fs.copyFile(`./04-copy-directory/files/${file}`, `./04-copy-directory/files-copy/${file}`, (err) => {
			if (err) {
				console.log("Error Found:", err);
			}

		})
	})
})

