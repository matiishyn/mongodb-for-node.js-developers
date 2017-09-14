const MongoClient = require('mongodb').MongoClient;

// Open the connection to the server
MongoClient.connect('mongodb://localhost:27017/dbname', function (err, db) {
  if (err) throw err;

  // Find one document in collection
  /* db.collection('coll').findOne({}, function (err, doc) {
    if (err) throw err;

    // print result
    console.dir(doc);

    // close db
    db.close();
  }); */

  // or find all docs
  db.collection('movies').find({}).toArray((err, docs) => {
    docs.forEach(doc => {
      console.dir(doc);
    });

    // close db
    db.close();
  });

});
