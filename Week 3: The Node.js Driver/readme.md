# Week 3: The Node.js Driver

## Content
1. [find() and Cursors in the Node.js Driver](https://www.youtube.com/watch?v=XCjpSq7H_G4)
1. [Projection in the Node.js Driver](https://www.youtube.com/watch?v=p4d8ux834b4)
1. [The CrunchBase Dataset](https://www.youtube.com/watch?v=pdun3EPqwDs)
1. [Query Operators in the Node.js Driver](https://www.youtube.com/watch?v=b39cyy75Lbs)
1. [$regex in the Node.js Driver](https://www.youtube.com/watch?v=JOzJcUVK-RY)
1. [Dot Notation in the Node.js Driver]()
1. [Dot Notation on Embedded Documents in Arrays]()
1. [Sort, Skip, and Limit in the Node.js Driver]()
1. [insertOne() and insertMany() in the Node.js Driver]()
1. [deleteOne() and deleteMany() in the Node.js Driver]()

## find() and Cursors in the Node.js Driver

- `mongoimport` - importing from human readable JSON
- `mongorestore` - restoring DB from binary

`mongoimport -d crunchbase -c companies companies.json`
```
mongo <<<<< TO MONGO SHELL

show dbs
use crunchbase
db.companies.find().count()
```
