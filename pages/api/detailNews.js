const PythonShell = require("python-shell").PythonShell;

export default async function handler(req, res) {
  let { news } = req.query;
  if (news) {
    let pyshell = new PythonShell("../readNews.py", { mode: "text" });
    let callPython = new Promise((resolve, reject) => {
      pyshell.send(JSON.stringify([news]));
      pyshell.on("message", function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        if (message) resolve(message);
        else reject(message);
      });

      // end the input stream and allow the process to exit
      pyshell.end(function (err, code, signal) {
        if (err) throw err;
        console.log("The exit code was: " + code);
        console.log("The exit signal was: " + signal);
        console.log("finished");
      });
    }).catch((e) => console.log(e));
    callPython.then(function (fromRunpy) {
      let data = fromRunpy
        ?.toString()
        ?.replaceAll('"', "")
        ?.replaceAll("“", "")
        ?.replaceAll("”", "")
        ?.replaceAll(/\\n/g, " ")
        ?.replaceAll(/\\'/g, " ")
        ?.replaceAll(/'/g, '"');

      data = data?.substring(); // removing first charcter
      data = data?.substring(0, data.length); // remove last character
      if (data?.toString()) {
        res.jsonp(JSON.parse(data));
        return;
      } else {
        let error = { msg: "News Not Found", status: 500 };
        res.jsonp(error);
        return;
      }
    });
  } else {
    let error = { msg: "News Not Found", status: 500 };
    res.jsonp(error);
    return;
  }
}
