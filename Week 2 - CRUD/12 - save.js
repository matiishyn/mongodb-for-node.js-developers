var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var query = {assignment: 'hw2'};
// SAVE - taking the document ('doc'), checking if there's _id
// if there's a doc, it will update, otherwise upsert
// like Replacement Update
    db.collection('grades').findOne(query, function(err, doc) {
        doc['date_returned'] = new Date();        
        db.collection('grades').save(doc, function(err, saved) {
            return db.close();        
        });
    });
});