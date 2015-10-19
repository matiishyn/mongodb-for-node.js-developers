var MongoClient = require('mongodb').MongoClient;

// Open the connection to the server
MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
  if (err) throw err;

  // Find document in collection
  db.collection('coll').findOne({}, function (err, doc) {
    if (err) throw err;

    // print result
    console.dir(doc);

    // close db
    db.close();
  });

  console.log('Called findOne');
});
