// server.js

// BASE SETUP
// =============================================================================
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/test';
var database;

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    database = db;
});


// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8081/api/bears)
    .post(function (req, res) {

        var bear = { name: req.body.name, title: "About MongoDB" };    // create a new instance of the Bear model


        // save the bear and check for errors
        database.collection('Bears').insertOne(bear, function (err, r) {
            //console.log(r.insertedCount);
            res.json({ inserted:"ok" });
        })

    })

    // get all the bears (accessed at GET http://localhost:8081/api/bears)
    .get(function (req, res) {
        database.collection('Bears').find().toArray(function (err, results) {
            console.log(results)
            res.json(results);
            // send HTML file populated with quotes here
        })
    });


router.route('/bears/count')

    // get bear count
    .get(function (req, res) {
        database.collection('Bears').count(function (err, bear) {
            if (err)
                res.send(err);
            //res.json({ count: bear });
        });
    })
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        var id = new require('mongodb').ObjectID(req.params.bear_id);
        database.collection('Bears').findOne(id, function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function (req, res) {

        // use our bear model to find the bear we want
        var id = new require('mongodb').ObjectID(req.params.bear_id);
        database.collection('Bears').findOne(id, function (err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            database.collection('Bears').update({ _id: id }, { $set: { name: req.body.name } }, function (err, result) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function (req, res) {
        var id = new require('mongodb').ObjectID(req.params.bear_id);
        database.collection('Bears').remove({
            _id: id
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
});
//server.timeout = 10000;
console.log('Magic happens on port ' + port);
