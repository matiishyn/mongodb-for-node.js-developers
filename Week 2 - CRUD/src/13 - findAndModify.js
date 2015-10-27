var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var query = {name: 'comments'},
        sort = [],
        operator = {$inc: {counter:1}},
        options = {new: true}; // the new document to be returned, after updating
    
    db.collection('counters').findAndModify(query, sort, operator, options, function(err, doc) {
        console.log(doc);
        return db.close();
    });
});