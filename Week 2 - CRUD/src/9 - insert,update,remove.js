var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var doc1 = {student: 'Calvin', age: 25},
        // specify _id manually, impossible to insert multiple times
        doc2 = {_id:'Calvin', age: 25},
        // insert multiple documents
        doc3 = [{student:'John'},{student:'Nick'}]
    // inserting, similar for all docs    
    db.collection('students').insert(doc1, function(err, inserted) {
        console.log('inserted: ', JSON.stringify(inserted));
        return db.close();
    });
});