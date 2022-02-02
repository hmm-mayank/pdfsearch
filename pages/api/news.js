// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let Parser = require("rss-parser");
let Feeds = require("./feeds/sources");
let parser = new Parser();

export default async function handler(req, res) {
  let { lang, newspaper } = req.query;
  let getrssUrl = Feeds?.filter((e) => e.lang == (lang || "en"));
  if (!newspaper) {
    let newsCollection = [];
    let resolveProlise = new Promise((resolve, reject) => {
      getrssUrl[0].sources.map(async (e) => {
        let feed = await parser.parseURL(e.url);
        newsCollection.push(feed);
        if (newsCollection.length == getrssUrl[0].sources.length) {
          resolve(newsCollection);
        }
      });
    });
    resolveProlise.then((e) => {
      if (e) res.send(e);
    });
  } else {
    let getSourceUrl = getrssUrl[0]?.sources.filter(
      (e) => e.newPaper == (newspaper || "toi")
    );
    if (getSourceUrl.length === 1) {
      let feed = await parser.parseURL(getSourceUrl[0]?.url);
      res.send(feed);
      return;
    } else {
      res.status(500).json({ msg: "Please check type", status: 500 });
    }
  }
}
