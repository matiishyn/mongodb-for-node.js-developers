var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var grades = db.collection('data');

    var options = {'sort' : [['State', 1], ['Temperature', -1]] };
    var cursor = grades.find({}, {}, options);
    var state = '';
    var queries = [];
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            // UPDATE HERE
            queries.forEach(function(query) {
                console.log(query);
                db.collection('data').find(query, function(err, doc){
                    console.log(doc);
                });
            });

            return db.close();
        }
        // is it unique state
        if(doc["State"] !== state){
            // YES
            state = doc["State"];
            console.dir(doc["State"]+': '+doc["Temperature"]);
            // FOUND DOC
            queries.push({
                "State": doc["State"],
                "Temperature": doc["Temperature"]
            });
        }
    });
});

