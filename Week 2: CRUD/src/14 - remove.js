var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var query = {assignment: 'hw3'};

    db.collection('counters').remove(query, function(err, removed) {
        console.log('removed: ',removed);
        return db.close();
    });
});

/**
 ways to remove all items
 db.collection('foo').remove(callback);
 db.collection('foo').remove({ 'x' : { '$nin' : [] } }, callback);
 db.collection('foo').remove({}, callback);
 */
