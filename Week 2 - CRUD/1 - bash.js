db // shows current db name

db.people.insert(doc) // insert document into people collection of current db

db.people.find() // query, show all

// FIND ONE
db.people.findOne() // show one
db.people.findOne({"name":"Ivan"}) // find specific
db.people.findOne({"name":"Ivan"}, {"name":true, "_id":false}) // show 'name' firld, but hide '_id' field

// FIND
db.people.find().pretty() // display json
db.people.find({"type":"book"}) // search params
db.people.find({type:"book", student: 19}) // search params, match both criterias
db.people.find({"type":"book"},{"name":true}) // specify fields that should be returned in documents

$GT $ LT