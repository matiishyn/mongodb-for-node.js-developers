/*
1. install latest mongoDB
2. add 'bin' to 'path' system variable
3. add data folder
    md \data\
    md \data\db\
4. run 'mongod' to start service
5. in separate cmd run 'mongo' and type commands
*/

// COMMANDS
show dbs // 
use demo // 

db.things.find()
db.things.insert({a:1, b:2})
db.things.find({a:1})
    // { "_id" : ObjectId("550955912c54765c769d46ea"), "a" : 1, "b" : 2 }
db.things.find().pretty()