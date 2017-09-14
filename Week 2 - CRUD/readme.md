# Week 2: CRUD

## Creating documents
* insertOne()
* insertMany()
* update commands ('upserts')

```js
db.collName.insert( document );
db.collName.find(); // find all inserted docs
```

Insert one:
```js
db.movies.insertOne({title:'Rocky', year:1976});
db.movies.find().pretty()
```

Insert with ID:
```js
db.movies.insertOne({title:'Rocky', year:1976, "_id":'tt0075148'});
```

Insert many:
```js
db.movies.insertMany([
  {title:'Rocky', year:1976},
  {title:'Star Trek', year:2009},
]);
```

Insert many
but if it finds an error, it will still try to insert the rest of the document
```js
db.movies.insertMany([
  {title:'Rocky', year:1976},
  {title:'Star Trek', year:2009},
], {ordered: false});
```

## The `_id` field ([video](https://www.youtube.com/watch?v=EZAuZv4Rz3U))

## Reading Documents ([video](https://www.youtube.com/watch?v=yP0Islq0kBo))

find:
```js
db.movies.find({rated:'PG-13'}).pretty();               // find all where rated=PG-13
db.movies.find({rated:'PG-13'}).count();                // length, number of found items
db.movies.find({rated:'PG-13', year: 2009}).count();    // find all where rated and year
```

### Object
dot notation:
```js
db.movies.find({"tomato.meter":100}).pretty();          // tomato: {meter: 100}
```

### Array
- on entire array
    ```js
      db.movies.find({writers:['Ethan Coen', 'Joel Coen']}).pretty();   // exact match, order matters
    ```
- on any element
    ```js
      db.movies.find({actors:'Jeff Bridges'}).pretty();   // any element in array matches this value
    ```
- on a specific element
    ```js
      db.movies.find({"actors.0":'Jeff Bridges'}).pretty();   // Jeff should be in the first position of the array
    ```

- operators



## Querying
### `findOne`
```js
db.people.findOne(); // get one doc
db.people.findOne({ name: 'Ivan' }); // get one doc where name=Ivan
db.people.findOne({ name: 'Ivan'}, {name: true, _id: false }); // specify props to be returned

```

### `find`
```js
db.people.find(); // get all documents
db.people.find().pretty(); // more readable
db.people.find({ student: 19 }); // where student=19
db.people.find({ student: 19, type: 'essay' }); // where student=19 AND type='essay'
db.people.find({ type: 'essay' }, { score: true }); // what fields to be returned
```

## Comparison Operators ([video](https://www.youtube.com/watch?v=MgPbE7d-0hQ), [docs](https://docs.mongodb.com/manual/reference/operator/query-comparison/))
### `$gt` and `$lt` query operators
```js
db.scores.find({ score: {$gt: 95} });                 // 'score' should be greater than 95
db.scores.find({ score: {$gt: 95}, type: 'essay' });  // 'score' > 95 AND type='essay'
db.scores.find({ score: {$gt: 95, $lte: 98} });       // 'score' > 95 AND 'score' <=98

db.movies.find({rated: {$ne: 'UNRATED'}});            // not equal, select all films except unrated
```

### Inequalities on Strings
```js
db.people.find({ name: {$lt: 'D', $gt: 'B'} });
// {name: "Bob"}
// {name: "Charlie"}
```

### Using `$regex`, `$exists`, `$type`
```js
db.people.find({ profession: { $exists: true } });  // get only docs with 'profession`
db.people.find({ profession: { $exists: false } }); // get only docs without 'profession` field

db.people.find({ name: { $type: 2 } });             // get only docs with type where 'name' is 'string' (look for BSON types) 
db.movies.find({_id:{$type:'string'}}).count();     // elements where _id is string
```

### Using `$regex` ([video](https://www.youtube.com/watch?v=dgFiInkJv_M))
```js
db.people.find({ name: { $regex: "e$" } });         // where name is ended by "e"
db.people.find({ name: { $regex: "^A" } });         // 'name' must start with "A"

db.movies.find({"awards.text": {$regex: /^Won.*/}});
```

### Using `$or`
```js
db.people.find({ $or: [ {query}, {query} ] });
db.people.find({ $or: [ {name: 'Ivan'}, {name: 'John'} ] }); // 'name' should be either 'Ivan' OR 'John'
```

### Using `$and`
```js
db.people.find({ $and: [ {query}, {query} ] });
```

### Querying Inside Arrays
```js
// { name: 'George', favorites: [ 'pretzels', 'beer' ] }

db.people.find({ favorites: 'beer' }); // looking for specific value or inside Array
db.people.find({ favorites: 'beer', name: { $gt: 'H' } }); // combined query
```

### Using `$in` and `$all`
```js
// { name: 'George', favorites: [ 'pretzels', 'beer' ] }

db.people.find({ favorites: { $all: ['pretzels', 'beer'] } });  // looking for 'pretzels' AND 'beer' to be inside Array, can be in any order
db.people.find({ name: { $in: ['Howard', 'John'] } });          // find document where name is one of Array
db.people.find({ favorites: { $nin: ['beer', 'ice cream'] } }); // 
```

### $size, $elemMatch ([video](https://www.youtube.com/watch?v=npIsBIW7-ew))
```js
db.movies.find({countries: {$size: 1}}).pretty();       // array of one element
```
```js
boxOffice = [ { "country": "USA", "revenue": 41.3 },
             { "country": "Australia", "revenue": 2.9 },
             { "country": "UK", "revenue": 10.1 },
             { "country": "Germany", "revenue": 4.3 },
             { "country": "France", "revenue": 3.5 } ]

db.movieDetails.find({ boxOffice: { country: "UK", revenue: { $gt: 15 } } });               // UK or $gt
db.movieDetails.find({ boxOffice: {$elemMatch: { country: "UK", revenue: { $gt: 15 } } } }) // UK and $gt
```

### Queries with Dot Notation
```js
{ name: 'George', email: { work: 'g@work.com', personal: 'g@gmail.com' } }

db.people.find({ email: { work: 'g@work.com', personal: 'g@gmail.com' } }); // will find ONLY when order is correct
db.people.find({ email: { work: 'g@work.com' } }); // will NOT find anything
db.people.find({ "email.work": 'g@work.com' }); // will find doc
```

## Cursors
```js
cur = db.people.find();   // returns a curson
cur.objsLeftInBatch();    // 101 - number of remaining documents in batch 
cur.hasNext();            // true
cur.next();               // returns next document - {...}, next results
```
```js
cur = db.people.find();null;
cur.limit(5);null; // after this execution next querying will be limited by 5. Returns cursor
```
```js
cur = db.people.find();
cur.sort( {name: -1} ); // after this execution next querying will be sorted. Returns cursor
```
```js
cur.sort(...).limit(5);
while (cur.hasNext()) printjson(cur.next());
```
```js
cur.limit(3).skip(2); // skipping first 2 and taking next 3 docs
```

## Projection
is a handy way of reducing the size of returned query

Explicitly include fields:
```js
db.movies.find({rated:'PG'}, {title:1}).pretty();         // only title and _id displayed
```

Explicitly exclude fields:
```js
db.movies.find({rated:'PG'}, {title:1, _id:0}).pretty();  // only title displayed
```

## Order of processing in MongoDB

1. sort
2. skip
3. limit

### Counting Results
```js
db.people.count({query}); // 1000
```




## Update ([video](https://www.youtube.com/watch?time_continue=1&v=qrlqLZl4s4E),[docs](https://docs.mongodb.com/manual/reference/operator/update-field/))
- updateOne()
- updateMany()

```js
db.movies.updateOne({title: 'the martian'}, {$set: {poster: 'http://image.jpg'}});  // first one found is updated
```

```js
db.people.update( {query}, {this will replace whats found} );
db.people.update( {name: 'John'}, {name: 'Smith', salary: 50} );
```

### Using the `$set` Command
manipulating just specific fields in the doc, but not replace the whole doc
```js
db.people.update( {name: 'John'}, {$set: {age: 30}} ); // if there's no age then one will be created 
db.people.update( {name: 'John'}, {$inc: {age: 1}} ); // age = age + 1
```

### Using the `$unset` Command
remove field(s) and its value
```js
db.people.update( {name: 'John'}, {$unset: {age: 1}} ); // and 'profession' field is gone
```

### Array update operators ([docs](https://docs.mongodb.com/manual/reference/operator/update-array/))
Using `$push`, `$pop`, `$pull`, `$pullAll`, `$addToSet`
Manipulating arrays inside of documents
```js
// { _id: 0, a: [1,2,3,4] }
db.arrays.update( {_id: 0}, {$set: {"a.2": 5}} );       // change 3rd element
db.arrays.update( {_id: 0}, {$push: {a: 6}} );          // add new to right
db.arrays.update( {_id: 0}, {$pushAll: {a: [7,8,9]}} ); // DEPRECATED add new elements to right
db.arrays.update( {_id: 0}, {$pop: {a: 1}} );           // remove last from RIGHT
db.arrays.update( {_id: 0}, {$pop: {a: -1}} );          // remove last from LEFT
db.arrays.update( {_id: 0}, {$pull: {a: 5}} );          // remove the value "5"
db.arrays.update( {_id: 0}, {$pullAll: {a: [2,4]}} );   // remove any occurrence of any of those values

db.arrays.update( {_id: 0}, {$addToSet: {a: 5}} );      // add new if not exists yet
```

### Upserts
Update an existing document or create a new one if doesn't exists
```js
db.people.update( {name: 'John'}, {$set: {age: 30}}, {upsert: true} );
```
### Multi-update 
Update multiple documents
```js
db.people.update( { }, {$set: {title: "Dr"}} ); // update first one
db.people.update( { }, {$set: {title: "Dr"}}, {multi: true} ); // update every document in collection
```

## Delete
```js
db.people.remove({query}); // remove
db.people.remove({}); // remove all
db.people.drop(); // remove all (dropping), will drop the PEOPLE collection
db.people.remove({name: 'Alice'}); // remove
```

## Node.js Driver and CRUD
see files in `src` folder

# Homework
## Homework 2.1
### Process
import downloaded csv file
```
mongoimport --type csv --headerline weather_data.csv -d weather -c data
```
query for result
```
use weather;
db.data.find({"Wind Direction": {$gt: 180, $lt: 360}}).sort({"Temperature": 1}).limit(1).pretty();
```

### Answer
`New Mexico`

## Homework 2.2
My solution is not correct :(

## Homework 2.3
Go to [users.js](hw/hw2-3/blog/users.js) 
31 and 66 lines.
