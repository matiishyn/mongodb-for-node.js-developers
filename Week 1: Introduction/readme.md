# Week 1: Introduction
### Download MongoDB and install it
1. Download from https://www.mongodb.org/download. Install. 
2. Add path to `C:\Program Files\MongoDB\Server\3.0\bin` to `PATH` Windows variable
3. Create `\data\db` directory for MongoDB to store data

### Running
1. Run MongoDB server by running `mongod` in console 
2. In separate console run `mongo`. And here you may run queries

### Intro to Mongo Shell ([video](https://www.youtube.com/watch?v=8To9enkSUHI))
```bash
help                # show all commands

# DB
show dbs            # show all available DBs
use demo            # switch to DB. (and create if not exists)

# Collections
# Read
db.myColl.find()            # usind current DB find all documents from 'myColl' collection
db.<col>.find().pretty()    # pretty json 
db.movies.find({year:1975}) # select where

# Create
db.insert({<JSON document>})
db.movies.insertOne({title:'Jaws', year:1975, imdb:'tt0073195'})


db.things.save({})
db.things.find().pretty()

# Cursor
var c = db.movies.find()        # cursor object
c.hasNext()                     # {Boolean}
c.next()                        # Next found object/document
```

### Hello World on Node.js
[2-node.js](src/2-node.js)

### Hello World, MondoDB Style ([video](https://www.youtube.com/watch?v=u3FLcQmaj1E))
[hello-world-mongodb.js](src/hello-world-mongodb.js)

### Hello World using Express
[3-express.js](src/3-express.js)

### Hello World using Express and Swig (OLD)
[express-swig.js](src/express-swig.js)

### Hello World using Express and Swig (NEW)([video](https://www.youtube.com/watch?v=Xww8NV71npM))
[express-swig.js](src/express-template.js)

### Hello World using Express, Swig, and MongoDB ([video](https://www.youtube.com/watch?v=S5z336ijwUE))
[5-mongo-2.js](src/5-mongo.js)

### Express: Handling GET Requests
[6-get.js](src/6-get.js)

## Homework
### Homework 1.1
0. run MongoDB server by `mongod [--dbpath=/data/db]`
`mongod --dbpath ~/mongo-data/db`
1. unzip downloaded
2. open `cmd` inside `\hw1`
`ls` -> `dump`
3. restore DB by `mongorestore dump`
4. Run `mongo` and commands:
```shell
use m101 
db.hw1_1.findOne()
```
5. **The answer is `Hello from MongoDB!`**

### Homework 1.2
1. The answer is `I like kittens`

### Homework 1.3
1. The answer is `Hello, Agent 007.`


## YouTube videos sources
- [Installing MongoDB windows](https://www.youtube.com/watch?v=sBdaRlgb4N8)
- [Installing MongoDB mac](https://www.youtube.com/watch?v=_WJ8m5QHvwc)
- [quick intro to the mongo shell 2](https://www.youtube.com/watch?v=j2v865GGS2A)
- [hello world nodejs](https://www.youtube.com/watch?v=Fv5Q_02BKrM)
- [hello world mongodb 2](https://www.youtube.com/watch?v=SgQv3KWEGDc)
- [hello world express swig](https://www.youtube.com/watch?v=0aG8aBUP6nQ)
- [hello world express swig and mongo 2](https://www.youtube.com/watch?v=KJMHteZRyXQ)
- [get requests 2](https://www.youtube.com/watch?v=DZkLTikYqc4)
- [mongodb is schemaless](https://www.youtube.com/watch?v=uKB-Hoqs6zI)

## MongoMart
[video](https://www.youtube.com/watch?v=C_1gx_Td20A)