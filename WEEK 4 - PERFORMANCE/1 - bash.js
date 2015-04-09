// WiredTiger
killall mongod
mkdir WT
mongod -dbpath WT -storageEngine wiredTiger
mongo // use WT
    db.foo.stats(); // info

// Indexes
db.students.explain().find({student_id: 5});
db.students.explain(true).find({student_id: 5});

// add index
db.students.createIndex({student_id:1}); // asc
db.students.createIndex({student_id:1, class_id:-1}); // asc

// read Indexes
db.students.getIndexes(); // will show array of indexes
db.students.dropIndex({student_id:1}); // remove index

// Multikey Indexes