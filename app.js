const fs = require("fs");
const express = require("express");
const multiparty = require("multiparty");

const app = express();
const port = 8888;

// static
app.use(express.static("."));

// index.html
app.get("/", (_req, res) => {
	fs.readFile("./index.html", "utf8", (err, data) => {
		if (err) {
			return res.end(err);
		}
		res.setHeader("Content-Type", "text/html");
		res.send(data);
	});
});

// upload
app.post("/upload", (req, res) => {
	var uploadDir = "./uploads";
	const form = new multiparty.Form({ uploadDir });
	form.parse(req); // 自动上传文件
	let url = `http://localhost:${port}/`;
	form.on("file", (_name, file) => {
		url += file.path;
		res.setHeader("Content-Type", "application/json");
		res.send({ msg: "upload success", url });
	});
});

app.listen(port, () => console.log(">>> server is runing on port " + port));
