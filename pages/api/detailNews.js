const Article = require("newspaperjs").Article;
export default async function handler(req, res) {
  let { news } = req.query;

  Article(news)
    .then((result) => {
      res.send(result);
    })
    .catch((reason) => {
      console.log(reason);
    });
}
