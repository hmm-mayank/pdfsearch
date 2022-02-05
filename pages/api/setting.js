const fs = require("fs");
const util = require("util").promisify;
const fs_write = util(fs.writeFile);
const fs_read = util(fs.readFile);

export default async function handler(req, res) {
  // limit = 40, cycle = 7, memory = 1024

  let { limit, cycle, memory, type } = req.query;
  if (type === "write") {
    let updateSetting = {
      limit: limit ? parseInt(limit) : 40,
      cycle: cycle ? parseInt(cycle) : 7,
      memory: memory ? parseInt(memory) : 1024,
    };
    fs_write("public/setting.json", JSON.stringify(updateSetting));
    fs_read("public/setting.json", "utf-8").then((e) => {
      res.json(e);
      return 0;
    });
  } else {
    fs_read("public/setting.json", "utf-8").then((e) => {
      res.json(e);
      return;
    });
  }

  //
  //   res.json(readResponse);
}
