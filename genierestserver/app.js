// issue1 comment add
// GN-12345 add comment
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// configure app to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure server port
var port = process.env.PORT || 3000;

// configure router
var router = require('./routes')(app);

// run server
var server = app.listen(port, function () {
    console.log("Express server has started on port " + port);
});


// configure mongoose
// connect to mongodb server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // connected to mongodb server
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
