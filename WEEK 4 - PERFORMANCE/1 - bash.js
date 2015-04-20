// WiredTiger
killall mongod
mkdir WT
mongod -dbpath WT -storageEngine wiredTiger
mongo // use WT
    db.foo.stats(); // info

// Indexes
db.students.explain().find({student_id: 5});
db.students.explain(true).find({student_id: 5});// true will tell us how many docs were examined

// add index
db.students.createIndex({student_id:1}); // asc
db.students.createIndex({student_id:1}, {unique: true}); // asc, unique for unique fields only
    // clear additional data
    db.stuff.remove({things:'apple'}, {justOne: true}); // leave only one item where things:'apple'
db.students.createIndex({student_id:1, class_id:-1}); // asc and desc
db.people.createIndex({"work_history.company":-1}); // for "work_history" : [{"company" : "DoubleClick","position" : "Software Engineer"},...]

// Sparse Indexes - when some elements are missed

// read Indexes
db.students.getIndexes(); // will show array of indexes
db.students.dropIndex({student_id:1}); // remove index

//============
// ex
db.students.findOne();
/*
{
    id: 0,
        scores: [
            {
                type: 'exam',
                score: 70
            },{
                type: 'quiz',
                score: 80
            }
        ]
}*/

// find all scores for exam gt 90
db.students.explain(true).find('scores': {$elemMatch: type:'exam', score:{'$gt':90}});


