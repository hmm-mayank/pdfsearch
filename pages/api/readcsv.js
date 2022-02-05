var xlsx = require("node-xlsx");
var fs = require("fs");
const axios = require("axios");
const util = require("util").promisify;
const fs_writeFile = util(fs.appendFileSync);
const fs_open = util(fs.open);
const csv = require("csv-parser");
// import path from "path";
console.log(__dirname);
let count = 0;
// console.log(div);

// public/uploads/${filePath}
export const read = async (filePath) => {
  let fullFilePath = `public/uploads/${filePath}`;
  // var obj = xlsx.parse(`public/uploads/${filePath}`); // parses a file
  // var obj = xlsx.parse(fs.readFileSync(`public/uploads/${filePath}`)); // parses a buffer
  var data = "";
  var readStream = fs.createReadStream(fullFilePath, {
    encoding: "utf-8",
    autoClose: true,
    highWaterMark: 1 * 1,
  });
  readStream
    .pipe(csv())
    .on("data", async function (row) {
      let phoneNumber = row[Object.keys(row)[0]].toString();
      console.log(count++);
      // console.log(phoneNumber.substring(1), "Aplle");
      await getResult(phoneNumber, filePath);
      if (count === 40) {
        if (!readStream.isPaused()) readStream.pause();
        count = 0;
        setInterval(() => {
          if (readStream.isPaused()) readStream.resume();
        }, 9000);
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
      `http://localhost:3000/api/lookup?phone=${numberPhone}`
    );

    console.log(result);
    resolve(result.data);
  });
  data
    .then((e) => {
      fs_writeFile(`pages/api/feeds/${filePath}.txt`, JSON.stringify(e) + ",");
      console.log(e);
    })
    .catch((e) => console.log(e));
}
