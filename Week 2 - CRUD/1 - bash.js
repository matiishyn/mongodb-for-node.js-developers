db // shows current db name

db.people.insert(doc);// insert document into people collection of current db

db.people.find();// query, show all

// FIND ONE
db.people.findOne();// show one
db.people.findOne({"name":"Ivan"});// find specific
db.people.findOne({"name":"Ivan"}, {"name":true, "_id":false});// show 'name' firld, but hide '_id' field

// FIND
db.people.find();pretty();// display json
db.people.find({"type":"book"});// search params
db.people.find({type:"book", student: 19});// search params, match both criterias
db.people.find({"type":"book"},{"name":true});// specify fields that should be returned in documents

// $GT $LT
db.scores.find( {score: { $gt: 95 }} );// select * from scores where score > 95
db.scores.find( {score: { $gt: "D" }} );
db.scores.find( {score: { $gt: 95 }, {type: "essay"}} );// select * from scores where score > 95 and type='essay'
db.scores.find( {score: { $gt: 95, $lte: 98 }} );// select * from scores where score between 96 and 20

// $EXISTS $TYPE
db.people.find({profession: {$exists: true}});// find where profession exists
db.people.find({profession: {$type: 2}});// find where profession is a string - http://docs.mongodb.org/manual/reference/bson-types/ TYPES
db.people.find({profession: {$regex: "e$"}});// find using RegEx

// $OR
db.people.find({ $or: [{name: 'ivan'}, {age: 20}] });// match any query

// $AND
db.people.find({ $and: [{name: 'ivan'}, {age: 20}] });// match all queries

//=================================================================================================
// ARRAY
	// query
	db.products.find( { tags : "shiny" } );
	// will find both value that is "shiny" or array that contains that values
	// - { _id : 42, tags : [ "awesome", "shiny" , "green" ] }
	// - { _id : 45, tags : "shiny" }

	// $IN
	db.products.find( {name: {$in: ["Howard", "John"] }} ); // name is either Howard or John
	db.products.find( {fav: {$in: ["beer", "ice cream"] }} ); // fav array has any of the value

	// $ALL
	db.products.find( {fav: {$all: ["apple", "banana"] }} ); // fav array has all the values

    // a:[4,7,9,3,5]
    db.products.update({_id:0}, { $set: { "a.2": 1 } }); // changing 3rd element in array
    db.products.update({_id:0}, { $push: { a: 7 } }); // add element
    db.products.update({_id:0}, { $pop: { a: 1 } }); // remove last element
    db.products.update({_id:0}, { $pop: { a: -1 } }); // remove firt element
    db.products.update({_id:0}, { $pushAll: { a: [1,2,3] } }); // add array and concat
    db.products.update({_id:0}, { $pop: { a: 5 } }); // remove element with value 5
    db.products.update({_id:0}, { $popAll: { a: [5,4] } }); // remove any occurance of any of this values
    db.products.update({_id:0}, { $addToSet: { a: 7 } }); // add element if not exist yet, otherwise do nothing

//=================================================================================================
// Dot Notation -> Nested documents
	// we have
	{
		"_id": "...",
		"email": {
			"work": "work@mail",
			"personal": "personal@mail"
		}
	}
	// how to find it?
	db.users.find({email: {work: "work@mail"}}); // is incorrect
	db.users.find({"email.work": "work@mail"}); // is correct

//==================================================================================================
// CURSOR
	cursor = db.people.find(); null;
	cursor.hasNext(); // boolean
	cursor.next(); // document

	// limit
	cursor = db.people.find(); null;
	cursor.limit(5); // show only 5 els and shift cursor
	while (cursor.hasNext()) printjson( cursor.next() ); // print 5 documents

	// sorting
	cursor = db.people.find(); null;
	cursor.sort({ name: -1 }); null; // null is to avoid printing now
	while (cursor.hasNext()) printjson( cursor.next() ); // print documents in reverse order by name

	// chaining
	cursor = db.people.find(); null;
	cursor.sort({ name: -1 }).limit(3); null; // order of commands is saved

	// skip
	cursor = db.people.find(); null;
	cursor.skip(3); // jump over 3 items

//==================================================================================================
// Counting Results 
db.scores.count({key: 'val'}); // get number

// Update === replacement
db.people.update({name:"John"}, {name:"Nick", salary:5000}); // update(query, newData), all not-existing fields in second param will be removed

// $SET
db.people.update({name:"John"}, {$set:{ name: "Nick" }}); // update or create field if not exist
db.people.update({name:"John"}, {$inc:{ age: 1 }}); // increment field, n->n+1, Or create new field: 1

// $UNSET
db.people.update({name:"Jones"}, {$unset: {profession: 1}}); // remove field in found document(s)

// UPSERTS

