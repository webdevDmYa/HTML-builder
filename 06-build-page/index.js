const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(__filename)
let projectDist = path.join(__dirname, 'project-dist');
let indexHTML = path.join(projectDist, 'index.html')
let styleCSS = path.join(projectDist, 'style.css')
let styles = path.join(__dirname, 'styles');
let templateHTML = path.join(__dirname, 'template.html');
let components = path.join(__dirname, 'components');
let assetsCopy = path.join(projectDist, 'assets');
let assets = path.join(__dirname, 'assets');
stream.on('open', function () {
	fs.mkdir(projectDist,
		{
			recursive: true
		}, (err) => {
			if (err) {
				return console.error(err);
			}
			fs.open(indexHTML, 'w', (err, fd) => {
				if (err) {
					console.log(err)
				}
				fs.readFile(templateHTML, {
					encoding: 'utf8',
					flag: 'r'
				}, (err, template) => {
					if (err) {
						console.log(err, 'readFile')
					}
					fs.readdir(components, (err, filesDir) => {
						if (err) {
							console.log(err);
						}
						for (let i = 0; i < filesDir.length; i++) {
							fs.readFile(path.join(components, `${filesDir[i].split('.')[0]}.html`), {
								encoding: 'utf8',
								flag: 'r'
							}, (err, content) => {
								if (err) {
									console.log(err, 'readFile')
								}
								let regexp = new RegExp('\{{' + filesDir[i].split('.')[0] + '\}}', 'g');
								template = template.replace(regexp, content);
								fs.writeFile(indexHTML, template,
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
	fs.mkdir(assetsCopy,
		{
			recursive: true
		}, (err) => {
			if (err) {
				return console.error(err);
			}
			fs.readdir(assetsCopy, (err2, files2) => {
				if (err2) {
					console.log(err2)
				}
				fs.readdir(assets, (err, files) => {
					if (err) {
						console.log(err)
					}
					files2.forEach(item => {
						if (!files.includes(item)) {
							fs.unlink(path.join(assetsCopy, `${item}`), (err) => {
								if (err) throw err;
							});
						}
					})
					files.forEach(dir => {
						fs.mkdir(path.join(assetsCopy, `${dir}`),
							{
								recursive: true
							}, (err) => {
								if (err) {
									return console.error(err);
								}
								fs.readdir(path.join(assetsCopy, `${dir}`), (err2, item2) => {
									if (err2) {
										console.log(err)
									}
									fs.readdir(path.join(assets, `${dir}`), (err1, item) => {
										if (err1) {
											console.log(err)
										}
										item2.forEach(file => {
											if (!item.includes(file)) {
												fs.unlink(path.join(assetsCopy, `${dir}`, `${file}`), (err) => {
													if (err) throw err;
												});
											}
										})
										item.forEach(file => {
											fs.copyFile(path.join(assets, `${dir}`, `${file}`), path.join(assetsCopy, `${dir}`, `${file}`), (err) => {
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
		})
	fs.open(styleCSS, 'w', function (err, fd) {
		if (err) {
			console.log(err)
		}
		fs.readdir(styles, (err, files) => {
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

						fs.writeFile(styleCSS, str,
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