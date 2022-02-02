let Feeds = require("./feeds/sources");

/**
 *
 * @param {*} req | lang= en | hi
 * @param {*} res
 * @returns by default return all newspaper
 */
export default async function handler(req, res) {
  let { lang, newspaper } = req.query;
  let getrssUrl = Feeds?.filter((e) => e.lang == (lang || "en"));

  if (getrssUrl.length === 1) {
    let sourceArray = [];
    Feeds.forEach((e) => {
      if (e.lang == lang) sourceArray.push(e.sources);
      if (!lang) sourceArray.push(e.sources);
    });
    res.send(sourceArray);
    return;
  } else {
    res.status(500).jsonp({ msg: "Please check type", status: 500 });
  }
}
