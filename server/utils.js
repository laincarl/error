import fs from "fs";
import sourceMap from "source-map";
function fixPath(filepath) {
	return filepath.replace(/\.[\.\/]+/g, "");
}
var sourcesPathMap = {};
// 查找sourcemap
export function lookupSourceMap(mapFile, line, column, callback) {
	fs.readFile(mapFile, function (err, data) {
		if (err) {
			console.error(err);
			callback && callback(null);
			return;
		}
		var fileContent = data.toString(),
			fileObj = JSON.parse(fileContent),
			sources = fileObj.sources;

		sources.map(item => {
			sourcesPathMap[fixPath(item)] = item;
		});

		new sourceMap.SourceMapConsumer(fileContent).then(consumer => {
			var lookup = {
				line: parseInt(line),
				column: parseInt(column)
			};
			var result = consumer.originalPositionFor(lookup);

			var originSource = sourcesPathMap[result.source],
				sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)];

			result.sourcesContent = sourcesContent;

			callback && callback(result);
		});
	});
}