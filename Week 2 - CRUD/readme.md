# Week 2: CRUD

## Insert
```js
db.collName.insert( document );
db.collName.find(); // find all inserted docs
```

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

### `$gt` and `$lt` query operators
```js
db.scores.find({ score: {$gt: 95} }); // 'score' should be greater than 95
db.scores.find({ score: {$gt: 95}, type: 'essay' }); // 'score' > 95 AND type='essay'
db.scores.find({ score: {$gt: 95, $lte: 98} }); // 'score' > 95 AND 'score' <=98
```

### Inequalities on Strings
```js
db.people.find({ name: {$lt: 'D', $gt: 'B'} });
// {name: "Bob"}
// {name: "Charlie"}
```

### Using `$regex`, `$exists`, `$type`
```js
db.people.find({ profession: { $exists: true } }); // get only docs with 'profession`
db.people.find({ name: { $type: 2 } }); // get only docs with type where 'name' is 'string' (look for BSON types) 
db.people.find({ name: { $regex: "e$" } }); // where name is ended by "e"
db.people.find({ name: { $regex: "^A" } }); // 'name' must start with "A"
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

db.people.find({ favorites: { $all: ['pretzels', 'beer'] } }); // looking for 'pretzels' AND 'beer' to be inside Array, can be in any order
db.people.find({ name: { $in: ['Howard', 'John'] } }); // find document where name is one of Array
db.people.find({ favorites: { $in: ['beer', 'ice cream'] } });
```

### Queries with Dot Notation
```js
{ name: 'George', email: { work: 'g@work.com', personal: 'g@gmail.com' } }

db.people.find({ email: { work: 'g@work.com', personal: 'g@gmail.com' } }); // will find ONLY when order is correct
db.people.find({ email: { work: 'g@work.com' } }); // will NOT find anything
db.people.find({ "email.work": 'g@work.com' }); // will find doc
```

### Cursors
```js
cur = db.people.find();
cur.hasNext(); // true
cur.next(); // returns next document - {...}
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

Order of processing in MongoDB

1. sort
2. skip
3. limit

### Counting Results
```js
db.people.count({query}); // 1000
```

## Update
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

### Using `$push`, `$pop`, `$pull`, `$pullAll`, `$addToSet`
Manipulating arrays inside of documents
```js
// { _id: 0, a: [1,2,3,4] }
db.arrays.update( {_id: 0}, {$set: {"a.2": 5}} ); // change 3rd element
db.arrays.update( {_id: 0}, {$push: {a: 6}} ); // add new to right
db.arrays.update( {_id: 0}, {$pushAll: {a: [7,8,9]}} ); // add new elements to right
db.arrays.update( {_id: 0}, {$pop: {a: 1}} ); // remove last from RIGHT
db.arrays.update( {_id: 0}, {$pop: {a: -1}} ); // remove last from LEFT
db.arrays.update( {_id: 0}, {$pull: {a: 5}} ); // remove the value "5"
db.arrays.update( {_id: 0}, {$pullAll: {a: [2,4]}} ); // remove any occurrence of any of those values

db.arrays.update( {_id: 0}, {$addToSet: {a: 5}} ); // add new if not exists yet
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
db.people.drop(); // remove all (dropping)
db.people.remove({name: 'Alice'}); // remove
```

## Node.js Driver and CRUD
