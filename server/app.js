import express from "express";
import path from "path";
import bodyParser from "body-parser";
import http from "http";
import ejs from "ejs";
import parse from "./stack-parse";
import { lookupSourceMap } from "./utils";
let port = process.env.PORT || 9000;
var sourceMapPath = path.join(__filename, "..", "map");

const app = express();
// 跨域设置
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", " 3.2.1");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值
app.set("views", "./views");
app.set("view engine", "html");
app.engine(".html", ejs.__express);


const errorList = [];
app.get("/", (req, res) => {
	res.type("html");
	res.render("index");
});

app.get("/list", (req, res) => {
	Promise.all(errorList.map(error => new Promise((resolve) => {
		let { url, row, col, msg, category } = error;
		// console.log(category);
		if (category === "js") {
			try {
				var filename = path.basename(url);
				const stackLines = parse(msg);
				if (stackLines.length > 0) {
					const { file, lineNumber, column } = stackLines[0];
					filename = path.basename(file);
					row = lineNumber;
					col = column;
				}
				console.log(filename, parse(msg));
	
				lookupSourceMap(path.join(sourceMapPath, (filename + ".map")), row, col, function (res) {
					if (res) {
						resolve({
							...error,
							file: res.sourcesContent,
							msg: msg,
							source: res.source,
							row: res.line,
							column: res.column,
						});
					} else {
						resolve(error);
					}
				});
			} catch (e) {
				resolve(error);
			}
		} else {
			resolve(error);
		}
	})

	)).then((List) => {
		res.json(List);
	});
});
//提交结果
app.post("/report", (req, res) => {
	console.log(req.body);
	const { body: error } = req;
	// const {
	// 	msg,
	// 	url,
	// 	row,
	// 	col
	// } = error;
	errorList.push(error);
	res.json({
		code: 1,
	});
});
var server = http.createServer(app);
server.listen(port, () => {
	console.log("listening on port : " + port);
});