//  db.data.find().sort({'State':1,'Temperature':-1}).limit(5).pretty()
/*
{ State: 'California', Temperature: 81 }
{ State: 'Florida', Temperature: 83 }
{ State: 'New Mexico', Temperature: 57 }
{ State: 'Vermont', Temperature: 57 }
*/
var MongoClient = require('mongodb').MongoClient,
queries=[];

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var grades = db.collection('data');

    var state = '';
    var cursor = grades.find({}).sort({'State':1,'Temperature':-1});
    cursor.toArray(function(err, doc){
        doc.forEach(function(el){
            if(el["State"] !== state){
            // YES
                state = el["State"];
                //console.dir(el["State"]+': '+el["Temperature"]);
                // FOUND el
                queries.push({
                    "State": el["State"],
                    "Temperature": el["Temperature"]
                });
            }
        });

        queries.forEach(function(query) {
                console.log(query);
                var operator = {$set: {'month_high': true}};
                db.collection('data').update(query, operator, function(err, updated) {
                    console.log('updated');
                    return db.close();
                });

                db.collection('data').find(query).toArray(function(err, doc){
                    if(err) return db.close();
                    // console.log(doc);
                });
            });
    });
});

