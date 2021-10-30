const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename);
stream.on('open', function () {
	console.log('Hello in secret-folder this files:')
	fs.readdir('./03-files-in-folder/secret-folder', (err, stats) => {
		if (err) {
			console.error(err)
		}
		let arr = stats.forEach(item => {
			fs.stat(__dirname + '\\secret-folder\\' + item, (err, stats) => {
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