var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    var query = {'media.oembed.type': 'video'},
        projection = {'media.oembed.url':1, '_id':0};
    
    db.collection('reddit').find(query, projection).toArray(function(err, doc){
        console.dir(doc);
        db.close();
    });
    
});