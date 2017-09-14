var MongoClient = require('mongodb').MongoClient,
    request = require('request');

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    // REQUEST to get json
    request('http://www.reddit.com/r/technology/.json', function(err, response, body) {
        var obj = JSON.parse(body),
            stories = obj.data.children.map(function(story){ return story.data; });
        
        db.collection('reddit').insert(stories, function(err, data) {
            console.dir(data);
            db.close();
        });
    });
    
});