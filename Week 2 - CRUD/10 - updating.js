var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    // 1 - REPLACEMENT
    var query = {assignment: 'hw1'};
    db.collection('grades').findOne(query, function(err, doc){
        if(!doc) db.close(); // not found
        
        query['_id'] = doc['_id'];
        doc['date_returned'] = new Date();
        
        db.collection('grades').update(query, doc, function(err, updated) {
            console.log('updated');
            return db.close();
        });
    });
    
    // 2 - IN PLACE
    var query = {assignment: 'hw1'},
        operator = {$set: {'date_returned': new Date()}};
    db.collection('grades').update(query, operator, function(err, updated) {
        console.log('updated');
        return db.close();
    });
    
    // 3 - MULTI
    var query = {}, // all docs
        operator = {$unset: {'date_returned': ''}},
        options = {multi: true};
    db.collection('grades').update(query, operator, options, function(err, updated) {
        console.log('updated');
        return db.close();
    });
});