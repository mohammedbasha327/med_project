var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
app.set('views', './api/views');
app.set('view engine', 'pug');

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/css/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose = require('mongoose');
Med = require('./api/model/med_model');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/medDatabase",{
    useCreateIndex: true,
    useNewUrlParser: true
});

var routes = require('./api/routes/med_routes');
app.use('/', routes);


app.listen(port, () => {
    console.log("Server listening on port " +port);
});