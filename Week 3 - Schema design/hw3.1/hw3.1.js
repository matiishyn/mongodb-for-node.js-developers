// mongoimport -d school -c students < students.json

// TASK: remove the lowest homework score for each student

var MongoClient = require('mongodb').MongoClient,
queries=[];

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var students = db.collection('students');

    var cursor = students.find({});
    cursor.toArray(function(err, doc){
        


        doc.forEach(function(el, i){
            // all scores for specific student
            var scores = el.scores,
            lowestScore;
            // make array only with hwScores
            var hwScores = scores.filter(function(obj){
            	return obj.type == 'homework';
            });
            console.log(scores, ' - ',i);
            // now we have array with two values, let's compare them and assign lowestScore
            if(hwScores[0]['score']>hwScores[1]['score']) {
            	lowestScore = hwScores[1]['score'];
            } else {
            	lowestScore = hwScores[0]['score'];
            }

            
            // filter scores again
			var newScores = scores.filter(function(obj){
            	return obj.score !== lowestScore;
            });

            console.log(newScores, ' - ',i);
            //console.log(el._id);
            var newEl = el;
            newEl.scores = newScores;

        	db.collection('students').update({'_id':el._id},newEl, function(err, updated) {
		       if(err) throw err;
		       // console.dir("Updated Doc" + doc._id);
		    });

            // return db.close();

console.log('====================\n');
        });
    });
});

