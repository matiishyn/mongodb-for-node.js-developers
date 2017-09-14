var MongoClient = require('mongodb').MongoClient;

// 1 - sort
// 2 - skip
// 3 - limit
MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
  var grades = db.collection('grades');

  /* Skip, limit, sort
  var cursor = grades.find({});
  cursor.skip(1);
  cursor.limit(4);
  //cursor.sort('grade', 1);
  cursor.sort([['grade', 1], ['student', -1]]); // sort on 'grade' first then on 'students' desc
  */

  /* Options
  var options = {
      skip: 1,
      limit: 4,
      sort: [['grade', 1], ['student', -1]]
    },
    cursor = grades.find({}, {}, options);
  */

  cursor.each(function (err, doc) {
    if (err) throw err;
    if (doc === null) {
      return db.close();
    }
    console.dir(doc);
  });

});
