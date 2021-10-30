
const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename)
stream.on('open', function () {
	fs.open('./05-merge-styles/project-dist/bundle.css', 'w', function (err, fd) {
		if (err) {
			console.log(err)
		}
		fs.readdir('./05-merge-styles/styles/', (err, files) => {
			if (err) {
				console.log(err);
			}
			let arr = files.forEach(item => {
				if (path.extname(item).split('.').slice(1, 2)[0] === 'css') {
					fs.readFile(`./05-merge-styles/styles/${item}`, 'utf8', (err, content) => {
						if (err) {
							console.log(err)
						}
						let str = content;
						fs.writeFile('./05-merge-styles/project-dist/bundle.css', str,
							{
								encoding: "utf8",
								flag: "a",
								mode: 0o666
							},
							(err) => {
								if (err)
									console.log(err);
							});
					})
				}
			})
		})
	})
})