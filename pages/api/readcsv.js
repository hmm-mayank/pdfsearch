var xlsx = require("node-xlsx");
var fs = require("fs");
const axios = require("axios");
const util = require("util").promisify;
const fs_writeFile = util(fs.appendFileSync);
// import path from "path";
console.log(__dirname);

export async function read(filePath) {
  var obj = xlsx.parse(`public/uploads/${filePath}`); // parses a file
  var obj = xlsx.parse(fs.readFileSync(`public/uploads/${filePath}`)); // parses a buffer
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
  console.log(obj[0].data.length);
  for (let ele of obj[0].data) {
    let num = ele[0].toString();
    if (num.length == 11 && num.charAt(0) == 1) {
      num = num.substring(1);
    }
    console.log(num);

    const result = await axios.default.get(
      `http://142.132.183.253/api/lookup?phone=${num}`
    );
    console.log(result.data);
    fs_writeFile(
      "pages/api/feeds/phoneStatus.txt",
      JSON.stringify(result.data) + ","
    );
    await delay(10);
  }
}

// obj[0].data.forEach(async (e) => {

// });
// export default async function handler(req, res) {}
