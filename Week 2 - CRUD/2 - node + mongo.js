// Import data to DB from JSON
// mongoimport -d DBNAME -c COLLECTION FILE.json

// NodeJS App
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;
    var query = {grade: 100};    

    // FIND ONE
    db.collection('grades').findOne(query, function(err, doc){
        if(err) throw err;
        console.dir(doc);
        db.close();
    });
    
    // FIND
    db.collection('grades').find(query).toArray(function(err, doc){
        if(err) throw err;
        console.dir(doc);
        db.close();
    });
    
    // FIND - alternative
    var cursor = db.collection('grades').find(query);
    cursor.each(function(err, doc){
        if(err) throw err;
        if(doc === null) return db.close();
        console.dir(doc.student + ' got 100 grade');
    });
});