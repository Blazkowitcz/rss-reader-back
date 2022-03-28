const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let Parser = require('rss-parser');

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());

require('./app/routes/feed.route')(app);

app.listen(3000, function(){ 
    console.log("server started")
});
/* let parser = new Parser();
let url = ["https://www.journaldugeek.com/feed/", "https://gamergen.com/rss"];

(async () => {
    url.forEach(u => {
        toto(u);
    })
})();

async function toto(u) {
    let feed = await parser.parseURL(u);
    console.log(feed.title);
    feed.items.forEach(item => {
        console.log(item)
    });
} */