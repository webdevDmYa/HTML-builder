const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(__filename)

stream.on('open', function () {
	fs.mkdir(path.join(__dirname, 'project-dist'),
		{
			recursive: true
		}, (err) => {
			if (err) {
				return console.error(err);
			}
			fs.open('./06-build-page/project-dist/index.html', 'w', (err, fd) => {
				if (err) {
					console.log(err)
				}
				fs.readFile('./06-build-page/template.html', {
					encoding: 'utf8',
					flag: 'r'
				}, (err, template) => {
					if (err) {
						console.log(err, 'readFile')
					}
					fs.readdir('./06-build-page/components/', (err, filesDir) => {
						if (err) {
							console.log(err);
						}
						for (let i = 0; i < filesDir.length; i++) {
							fs.readFile(`./06-build-page/components/${filesDir[i].split('.')[0]}.html`, {
								encoding: 'utf8',
								flag: 'r'
							}, (err, content) => {
								if (err) {
									console.log(err, 'readFile')
								}
								let regexp = new RegExp('\{{' + filesDir[i].split('.')[0] + '\}}', 'g');
								template = template.replace(regexp, content);

								fs.writeFile('./06-build-page/project-dist/index.html', template,
									{
										encoding: "utf8",
										flag: "w",
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




	fs.mkdir(path.join(__dirname + '\\project-dist', 'assets'),
		{
			recursive: true
		}, (err) => {
			if (err) {
				return console.error(err);
			}
			fs.readdir('./06-build-page/project-dist/assets', (err2, files2) => {
				if (err2) {
					console.log(err2)
				}
				fs.readdir('./06-build-page/assets', (err, files) => {
					if (err) {
						console.log(err)
					}
					files2.forEach(item => {
						if (!files.includes(item)) {
							fs.unlink(`./06-build-page/project-dist/assets/${item}`, (err) => {
								if (err) throw err;
							});
						}
					})
				})
				files2.forEach(dir => {
					fs.mkdir(path.join(__dirname + '\\project-dist\\assets', `${dir}`),
						{
							recursive: true
						}, (err) => {
							if (err) {
								return console.error(err);
							}
							fs.readdir(`./06-build-page/project-dist/assets/${dir}`, (err2, item2) => {
								if (err) {
									console.log(err)
								}
								fs.readdir(`./06-build-page/assets/${dir}`, (err1, item) => {
									if (err) {
										console.log(err)
									}
									item2.forEach(file => {
										if (!item.includes(file)) {
											fs.unlink(`./06-build-page/project-dist/assets/${dir}/${file}`, (err) => {
												if (err) throw err;
											});
										}
									})
									item.forEach(file => {
										fs.copyFile(`./06-build-page/assets/${dir}/${file}`, `./06-build-page/project-dist/assets/${dir}/${file}`, (err) => {
											if (err) {
												console.log("Error Found:", err);
											}
										})
									})
								})

							})

						})

				})
			})

		})
	fs.open('./06-build-page/project-dist/style.css', 'w', function (err, fd) {
		if (err) {
			console.log(err)
		}
		fs.readdir('./06-build-page/styles/', (err, files) => {
			if (err) {
				console.log(err);
			}
			let arr = files.forEach(item => {
				if (path.extname(item).split('.').slice(1, 2)[0] === 'css') {
					fs.readFile(`./06-build-page/styles/${item}`, 'utf8', (err, content) => {
						if (err) {
							console.log(err)
						}
						let str = content;

						fs.writeFile('./06-build-page/project-dist/style.css', str,
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