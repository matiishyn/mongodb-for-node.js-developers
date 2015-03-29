var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    var query = {grade: 100},
        // get student field, not to get _id field
        projection = {student: 1, '_id': 0}; 
    
    // FIND
    db.collection('grades').find(query, projection).toArray(function(err, doc){
        console.dir(doc);
        db.close();
    });
    
});