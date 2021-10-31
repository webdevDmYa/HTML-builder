
const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename)
stream.on('open', function () {
	fs.readdir('./04-copy-directory/files', (err, files) => {
		if (err) {
			console.log(err);
		}

		files.forEach(file => {
			fs.copyFile(`./04-copy-directory/files/${file}`, `./04-copy-directory/files-copy/${file}`, (err) => {
				if (err) {
					console.log("Error Found:", err);
				}
			})


		})


	})
	fs.mkdir(path.join(__dirname, 'files-copy'),
		{
			recursive: true
		}, (err) => {
			if (err) {
				return console.error(err);
			}

			fs.readdir('./04-copy-directory/files-copy', (err, filesCopy) => {
				if (err) {
					console.log(err)
				}
				fs.readdir('./04-copy-directory/files', (err2, filesOrigin) => {
					if (err2) {
						console.log(err2)
					}

					filesCopy.forEach(item => {

						if (!filesOrigin.includes(item)) {
							fs.unlink(`./04-copy-directory/files-copy/${item}`, (err) => {
								if (err) throw err;

							});
						}
					})
				})
			})

		})
})


