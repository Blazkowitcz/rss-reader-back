module.exports = app => {
    let Controller = require('../controller/feed.controller');

    app.get('/feeds', Controller.getFeed);
}