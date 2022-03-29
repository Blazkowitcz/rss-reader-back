const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());

require('./app/routes/feed.route')(app);

app.listen(3000, function(){ 
    console.log("server started")
});