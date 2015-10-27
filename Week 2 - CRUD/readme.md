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
