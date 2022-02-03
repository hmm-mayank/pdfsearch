const Feeds = [
  {
    displayText: "Top Stories",
    key: "top_stories",
    lang: "en",
    sources: [
      {
        newPaper: "the_hindu",
        displayPaperText: "The Hindu",
        url: "https://www.thehindu.com/news/feeder/default.rss",
      },
      {
        newPaper: "live_mint",
        displayPaperText: "Live Mint",
        url: "https://www.livemint.com/rss/news",
      },

      {
        newPaper: "moneycontrol",
        displayPaperText: "money control",
        url: "https://www.moneycontrol.com/rss/MCtopnews.xml",
      },

      {
        newPaper: "toi",
        displayPaperText: "Time Of India",
        url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
      },
      {
        newPaper: "financialexpress",
        displayPaperText: "Financial Express",
        url: "https://www.financialexpress.com/feed/",
      },
    ],
  },
  {
    displayText: "बड़ी खबरें",
    key: "top_stories",
    lang: "hi",
    sources: [
      {
        newPaper: "bhaskarhindi",
        displayPaperText: "दैनिक भास्कर",
        url: "https://www.bhaskarhindi.com/rss/national.xml",
      },
      {
        newPaper: "hindustan",
        displayPaperText: "अमर उजाला",
        url: "https://feed.livehindustan.com/rss/3127",
      },
    ],
  },
];

module.exports = Feeds;
