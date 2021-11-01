
const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename)
let filesDir = path.join(__dirname, 'files')
let filesCopyDir = path.join(__dirname, 'files-copy')
stream.on('open', function () {
	fs.readdir(path.join(__dirname, 'files'), (err, files) => {
		if (err) {
			console.log(err);
		}
		files.forEach(file => {
			fs.copyFile(path.join(filesDir, `${file}`), path.join(filesCopyDir, `${file}`), (err) => {
				if (err) {
					console.log("Error Found:", err);
				}
			})
		})
	})
	fs.mkdir(filesCopyDir,
		{
			recursive: true
		}, (err) => {
			if (err) {
				return console.error(err);
			}
			fs.readdir(filesCopyDir, (err, filesCopy) => {
				if (err) {
					console.log(err)
				}
				fs.readdir(filesDir, (err2, filesOrigin) => {
					if (err2) {
						console.log(err2)
					}
					filesCopy.forEach(item => {

						if (!filesOrigin.includes(item)) {
							fs.unlink(path.join(filesCopyDir, `${item}`), (err) => {
								if (err) throw err;

							});
						}
					})
				})
			})
		})
})


