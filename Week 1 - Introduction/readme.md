## Week 1: Introduction
### Download MongoDB and install it
1. Download from https://www.mongodb.org/download. Install. 
2. Add path to `C:\Program Files\MongoDB\Server\3.0\bin` to `PATH` Windows variable
3. Create `\data\db` directory for MongoDB to store data

### Running
1. Run MongoDB server by running `mongod` in console 
2. In separate console run `mongo`. And here you may run queries

### Intro to Mongo Shell
```bash
show dbs #show all available DBs
use demo #switch to DB. (and create if not exists)
db.myColl.find() #usind current DB find all documents from 'myColl' collection
db.insert({<JSON document>})

db.things.save({})
db.things.find().pretty()
```

### hello world nodejs
[2-node.js](2-node.js)

### hello world nodejs
[hello-world-mongodb.js](hello-world-mongodb.js)


### YouTube videos sources
- [Installing MongoDB windows](https://www.youtube.com/watch?v=sBdaRlgb4N8)
- [Installing MongoDB mac](https://www.youtube.com/watch?v=_WJ8m5QHvwc)
- [quick intro to the mongo shell 2](https://www.youtube.com/watch?v=j2v865GGS2A)
- [hello world nodejs](https://www.youtube.com/watch?v=Fv5Q_02BKrM)
- [hello world mongodb 2](https://www.youtube.com/watch?v=SgQv3KWEGDc)
