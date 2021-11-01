
const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename)
let bundleCSS = path.join(__dirname, 'project-dist', 'bundle.css')
let styles = path.join(__dirname, 'styles');
stream.on('open', function () {
	fs.open(bundleCSS, 'w', function (err, fd) {
		if (err) {
			console.log(err)
		}
		fs.readdir('./05-merge-styles/styles/', (err, files) => {
			if (err) {
				console.log(err);
			}
			let arr = files.forEach(item => {
				if (path.extname(item).split('.').slice(1, 2)[0] === 'css') {
					fs.readFile(path.join(styles, `${item}`), 'utf8', (err, content) => {
						if (err) {
							console.log(err)
						}
						let str = content;

						fs.writeFile(bundleCSS, str,
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