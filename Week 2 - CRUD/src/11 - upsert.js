var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var query = {student: 'Frank', assignment: 'hw1'},
        //operator = {student: 'Frank', assignment: 'hw1', grade: 100}, // replacing the document
    // or
        operator = {$set: {date_returned: new Date()}, grade: 100},
        options = {upsert: true};

    db.collection('grades').update(query, operator, options, function(err, upserted) {
        console.log('updated: ' + upserted);
        return db.close();
    });
});
