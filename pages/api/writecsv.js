const fs = require("fs");
const csvWriter = require("csv-write-stream");

function writeCsvFile(fileName, chunk) {
  let writer = csvWriter({
    sendHeaders: fs.existsSync(fileName) ? false : true,
  });
  writer.pipe(fs.createWriteStream(fileName, { flags: "a" }));
  writer.write(chunk);
  writer.end();
}

export default writeCsvFile;
