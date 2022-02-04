var sys = require("util");
var exec = require("child_process").exec;

let app = express();

export default async function handler(req, res) {
  let { phone } = req.query;

  if (!phone) {
    res.json({ error: "Please pass phone as query param" });
    return;
  }
  let dir = exec(
    `mysql -h 208.78.161.167 -u anonymous -e 'call lrn.fulldataz('${phone}',curdate())';`,
    function (err, stdout, stderr) {
      if (err) {
        // should have err.code here?
      }

      let inform = stdout.split("\n");
      let legitInfoHeadings = inform[0].split("\t");
      let legitInfoValues = inform[1].split("\t");

      var result = legitInfoHeadings.reduce(function (result, field, index) {
        result[legitInfoValues[index]] = field;
        return result;
      }, {});
      res.json(result);
    }
  );

  dir.on("exit", function (code) {
    // exit code is code
  });
}
