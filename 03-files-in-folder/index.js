const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename);
let secretFolder = path.join(__dirname, 'secret-folder')
stream.on('open', function () {
	console.log('Hello in secret-folder this files:')
	fs.readdir(secretFolder, (err, stats) => {
		if (err) {
			console.error(err)
		}
		let arr = stats.forEach(item => {
			fs.stat(path.join(secretFolder, `${item}`), (err, stats) => {
				if (err) {
					console.error(err)
					return
				}
				if (stats.isFile()) {

					console.log(path.basename(item).split('.').slice(0, 1) + ' - ' + path.extname(item).split('.').slice(1, 2) + ' - ' + stats.size + 'kb')
				}
			})
		})
	})
})