var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    var query = {student: 'Joe', grade: {$gt: 80, $lt: 95}};
    
    db.collection('grades').find(query).toArray(function(err, doc){
        console.dir(doc);
        db.close();
    });
    
});