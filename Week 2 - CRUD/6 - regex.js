var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var query = {title: {$regex: 'NSA'}},
        projection = {title:1};
    
    db.collection('reddit').find(query, projection).toArray(function(err, doc){
        console.dir(doc);
        db.close();
    });
    
});