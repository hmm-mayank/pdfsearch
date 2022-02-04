const xlsx = require("node-xlsx");
// const Papa = require("papaparse");
const fs = require("fs");
const util = require("util").promisify;
const fs_read = util(fs.readFileSync);

// fs_read("phone.xlsx");
var obj = xlsx.parse(__dirname + "/phones.xlsx");

for (var i = 0; i < obj.length; i++) {
  var sheet = obj[i];
  console.log(obj[i]);
  //   fs.writeFile(`${outputPath}.${i}.csv`, Papa.unparse(sheet.data));
}
