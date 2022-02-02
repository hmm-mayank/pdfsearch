import sys
import json
from newspaper import Article
# Read data from stdin


def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])


def main():
    # get our data as an array from read_in()
    lines = read_in()

    # A new article from TOI
    url = lines[0]
    newsDict = dict()
    # For different language newspaper refer above table
    toi_article = Article(url, keep_article_html=True)  # en for English
    # To download the article
    if (toi_article):
        toi_article.download()
        toi_article.parse()

        newsDict['title'] = toi_article.title.replace('\\', ",")
        if(toi_article.text):
            newsDict['description'] = str(toi_article.text)
        if(toi_article.authors):
            newsDict['authors'] = toi_article.authors
        # if(toi_article.html):
        #     newsDict['html'] = toi_article.html
        if(toi_article.summary):
            newsDict['summary'] = toi_article.summary
        if(toi_article.keywords):
            newsDict['keywords'] = toi_article.keywords
        if(toi_article.images):
            newsDict['images'] = toi_article.top_image
            print(newsDict)


# Start process
if __name__ == '__main__':
    main()
