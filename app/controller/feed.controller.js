let Parser = require('rss-parser');
let feeds = require('../../feeds.json');
let parser = new Parser();

exports.getFeed = async (req, res) => {
    let result = [];
    let promises = feeds.map(async feed => {
        let data = await parseFeed(feed);
        data.forEach(t => {
            result.push(t);
        })
        return null;
    })
    await Promise.all(promises);
    result = sortArticles(result);
    res.send(result);
}

async function parseFeed(feed) {
    let articles = [];
    let data = await parser.parseURL(feed.url);
    data.items.forEach(item => {
        let img = "https://le-blog-du-geek.webnode.fr/_files/200000005-aab68abb1a/GEEK.jpg";
        if (item.enclosure !== undefined) {
            img = item.enclosure.url
        } else {
            let myRegex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
            let image_string = myRegex.exec(item.content);
            if (image_string !== null) {
                img = image_string[1];
            }
        }
        if (item.title !== undefined) {
            articles.push({ title: item.title, link: item.link, content: item.contentSnippet, date: item.isoDate, image: img });
        }
    });
    return articles
}

function sortArticles(articles) {
    articles.sort(function (a, b) {
        return Number(new Date(b.date)) - Number(new Date(a.date));
    });
    return articles;
}