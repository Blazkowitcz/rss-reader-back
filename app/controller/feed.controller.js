let Parser = require('rss-parser');
let feeds = require('../../feeds.json');
let parser = new Parser();

exports.getFeed = async (req, res) => {
    let result = [];
    let promises = feeds.map(async feed => {
        let toto = await parseFeed(feed);
        toto.forEach(t => {
            result.push(t);
        })
        return null;
    })
    await Promise.all(promises);
    res.send(result);
    /* feeds.forEach(async feed => {
        let toto = await parseFeed(feed);
        console.log(toto)
    }); */
}

async function parseFeed(feed) {
    let articles = [];
    let data = await parser.parseURL(feed.url);
    data.items.forEach(item => {
        let img = "https://le-blog-du-geek.webnode.fr/_files/200000005-aab68abb1a/GEEK.jpg";
        if(item.enclosure !== undefined){
            img = item.enclosure.url
        }
        if (item.title !== undefined) {
            articles.push({ title: item.title, link: item.link, content: item.contentSnippet, date: item.isoDate, image: img });
        }
    });
    return articles
}