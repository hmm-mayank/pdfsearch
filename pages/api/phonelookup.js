const accountSid = "ACa802530cd9ad3afcc594ba2fcce43a33"; //process.env.TWILIO_ACCOUNT_SID;
const authToken = "4c8f27651525c74dd62d87244bf75f1c"; // process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const util = require("util");
const fs = require("fs");
const fs_writeFile = util.promisify(fs.appendFile);
const fs_readFile = util.promisify(fs.readFile);
export default async function handler(req, res) {
  let { phone, countryCode, type } = req.query;

  if (type == "read") {
    let readFile = await fs_readFile(
      "pages/api/feeds/phonelookedup.txt",
      "utf-8"
    );
    readFile = readFile.substring(0, readFile.length - 1);
    readFile = "[" + readFile + "]";
    readFile = JSON.parse(readFile);
    res.send(readFile);
    return 0;
  }

  if (!phone) {
    res.status(500).jsonp({ message: "No Phone Found", status: 500 });
    return;
  } else {
    let dataPromise = new Promise((resolve, reject) =>
      client.lookups.v1
        .phoneNumbers(phone)
        .fetch({ countryCode: countryCode || "US", type: ["carrier"] })
        .then(async (phone_number) => {
          await fs_writeFile(
            "pages/api/feeds/phonelookedup.txt",
            JSON.stringify(phone_number) + ","
          );
          resolve(phone_number);
        })
        .catch((e) => reject(e))
    );
    dataPromise.then((e) => res.send(e));
  }
}
