import writeCsvFile from "./writecsv";
var fs = require("fs");
const axios = require("axios");
const util = require("util").promisify;
const fs_writeFile = util(fs.appendFileSync);
const fs_read = util(fs.readFile);
const csv = require("csv-parser");
// import path from "path";
let count = 0;
// console.log(div);

// public/uploads/${filePath}
export const read = async (filePath, limit = 40, cycle = 7, memory = 1024) => {
  let setting = await fs_read("public/setting.json", "utf-8");
  setting = JSON.parse(setting);

  limit = setting.limit || 40;
  cycle = cycle.limit || 7;
  memory = memory.limit || 1024;
  let fullFilePath = `public/uploads/${filePath}`;
  // var obj = xlsx.parse(`public/uploads/${filePath}`); // parses a file
  // var obj = xlsx.parse(fs.readFileSync(`public/uploads/${filePath}`)); // parses a buffer
  var data = "";
  var readStream = fs.createReadStream(fullFilePath, {
    encoding: "utf-8",
    autoClose: true,
    highWaterMark: memory * 1,
  });
  readStream
    .pipe(csv())
    .on("data", async function (row) {
      let phoneNumber = row[Object.keys(row)[0]].toString();
      await getResult(phoneNumber, filePath);
      if (count === limit) {
        if (!readStream.isPaused()) readStream.pause();
        count = 0;
        setInterval(() => {
          if (readStream.isPaused()) readStream.resume();
        }, cycle * 1000);
      }
    })
    .on("end", function () {
      console.log("###################");

      // here you see all data processed at end of file
    })
    .on("error", function (error) {
      console.log("---------ERROR-----------------");
      console.log(error);
    });
};
// const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
// const chunk = (arr, size) =>
//   arr.reduce(
//     (acc, e, i) => (
//       i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
//     ),
//     []
//   );

async function getResult(num, filePath) {
  let numberPhone;

  numberPhone = num.slice(num.length - 10);
  let data = new Promise(async (resolve, reject) => {
    const result = await axios.default.get(
      `http://142.132.183.253//api/lookup?phone=${numberPhone}`
    );

    writeCsvFile(
      `public/uploads/csv/${
        filePath +
        "" +
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getYear()
      }.csv`,
      result.data
    );
    resolve(result.data);
  });
  data
    .then((e) => {
      fs_writeFile(`pages/api/feeds/${filePath}.txt`, JSON.stringify(e) + ",");
    })
    .catch((e) => console.log(e));
}
