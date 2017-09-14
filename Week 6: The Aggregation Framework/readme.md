# Week 5: Aggregation Framework
## Simple example
```javascript
db.products.aggregate([
    {$group:
        {
            _id:"$category",
            num_products:{$sum:1}
        }
    }
])
```

## The Aggregation Pipeline 

1. `$project` - reshape - `1:1`
2. `$match` - filter - `n:1`
3. `$group` - aggregate - `n:1`
4. `$sort` - sort - `1:1` (every doc that comes in comes out)
5. `$skip` - skips - `n:1`
6. `$limit` - limits - `n:1`
7. `$unwind` - normalize - `1:n`
8. `$out` - output - `1:1`

## Compound Grouping 
```javascript
db.products.aggregate([
    {$group:
        {
            _id:{
                "maker": "$manufacturer"
                "category": "$category"
            },
            num_products:{$sum:1}
        }
    }
])
// will get unique values 
// of combinations of 'manufacturer' and 'category'
```

## Using a document for _id 

`_id` can be a complex document (`_id:{a:1, b:2}`) it just has to be unique

## Aggregation Expressions 
### Using `$sum`
```javascript
db.products.aggregate([
    {$group:
        {
            _id:{ "maker": "$manufacturer" },
            num_products:{$sum:"$price"}
        }
    }
])
```

Write an aggregation query to sum up the population (pop) by state and put the result in a field called population.
```js
db.zips.aggregate([{"$group":{"_id":"$state", "population":{$sum:"$pop"}}}])
```

### Using `$avg`
```javascript
db.products.aggregate([
    {$group:
        {
            _id: "$category",
            avg_price: {$avg:"$price"}
        }
    }
])
```

### Using `$addToSet`
```javascript
db.products.aggregate([
    {$group:
        {
            _id: "$category",
            categories: {$addToSet:"$category"}
        }
    }
])
// RESULT:
{... categories: ["Laptops", "Tablets"] }
```

Write an aggregation query that will return the postal codes that cover each city
```js
db.zips.aggregate([{"$group":{"_id":"$city", "postal_codes":{"$addToSet":"$_id"}}}])
```


### Using `$push`
Is very similar to `$addToSet` except it does not guarantee that the value in array is unique
```javascript
db.products.aggregate([
    {$group:
        {
            _id: "$category",
            categories: {$push:"$category"}
        }
    }
])
```


### Using `$max` and `$min`
```javascript
db.products.aggregate([
    {$group:
        {
            _id: "$category",
            maxprice: {$max:"$price"}
        }
    }
])
```

write an aggregation query that will return the population of the postal code in each state with the highest population
```js
db.zips.aggregate([{$group:{"_id":"$state", pop:{$max:"$pop"}}}])
```
[YouTube - m101 23 double grouping](https://www.youtube.com/watch?v=EIWF9Oxeb8M)


### Using `$project` (`1:1`)

* remove keys
* add new keys
* reshape keys
* some fuctions
    - `$toUpper`
    - `$toLower`
    - `$add`
    - `$multiply`

```javascript
db.products.aggregate([
    {$project:
        {
            _id: 0, // I don't want to include '_id' field
            maker: {$toLower: "$manufacturer"}
            details: {
                category: "$category",
                price: {$multiply: ["$price", 10]}
            },
            item: "$name"
        }
    }
])
// RESULT:
{ maker: "amazon", details: { category: "Tablets", price: 1990 }, item: "Kindle Fire" }
```

#### Quiz
Make this
```js
{
	"city" : "ACMAR",
	"loc" : [
		-86.51557,
		33.584132
	],
	"pop" : 6055,
	"state" : "AL",
	"_id" : "35004"
}
```
look like this
```js
{
	"city" : "acmar",
	"pop" : 6055,
	"state" : "AL",
	"zip" : "35004"
}
```
Answer:
```js
db.zips.aggregate([{$project:{_id:0, city:{$toLower:"$city"}, pop:1, state:1, zip:"$_id"}}])
```

### Using `$match` (`n:1`)
```js
db.products.aggregate([
    {$match:
        {
            state: "CA"
        }
    }, // will return all from CA
    {$group: 
        {
            _id: "$city",
            population: {$sum: "$pop"},
            zip_codes: {$addToSet: "$_id"}
        }    
    }, // Grouping cities in CA state

    // RESULT:
    // { _id: "TRUCKEE", population:9743, zip_codes: ["96132", "96161"] }
    // Let's use $project to rename "_id" to "city"
    
    {$project:
        {
            _id: 0,
            city: "$_id",
            population: 1,
            zip_codes: 1
        }
    }
    
    // RESULT:
    // { city: "TRUCKEE", population:9743, zip_codes: ["96132", "96161"] }
])

```

#### Quiz
write an aggregation query with a single match phase that filters for zipcodes with greater than 100,000 people
```js
db.zips.aggregate([{$match:{pop:{$gt:100000}}}])
```


### Using `$sort`
* Disk and memory based sorting. Memory based has limit 100mb
* can be done before or after the grouping (or both)

```js
db.products.aggregate([
    {$match:
        {
            state: "NY"
        }
    },
    {$group: 
        {
            _id: "$city",
            population: {$sum: "$pop"},
        }    
    },
    {$project:
        {
            _id: 0,
            city: "$_id",
            population: 1,
        }
    },
    {$sort:
        {
            population: -1,
        }
    }
])

```

### Using `$limit` and `$skip`
[YouTube - m101 31 skip limit](https://www.youtube.com/watch?v=o5hzYKXUyrU)

```js
db.products.aggregate([
    {$match:...},
    {$group:...},
    {$project:...},
    {$sort:...},
    
    {$skip:10},
    {$limit:5}
])
```
BUT, if you have limited and then skipped more than limited
```js
    {$limit:5},
    {$skip:10}
```
then result will be 0 since there's nothing to show

### Revisiting `$first` and `$last`
```js
 db.zips.aggregate([
     /* get the population of every city in every state */
     {$group:
      {
 	 _id: {state:"$state", city:"$city"},
 	 population: {$sum:"$pop"},
      }
     },
      /* sort by state, population */
     {$sort: 
      {"_id.state":1, "population":-1}
     },
 
     /* group by state, get the first item in each group */
     {$group: 
      {
 	 _id:"$_id.state",
 	 city: {$first: "$_id.city"},
 	 population: {$first:"$population"}
      }
     },
 
     /* now sort by state again */
     {$sort:
      {"_id":1}
     }
 ])
```

### Using `$unwind`
To unjoin the data from array. Example:
```js
{a:1,b:[2,3]}

//$unwind: "$b"
{a:1,b:2}
{a:1,b:3}
```

Example with Blog app
```js
db.posts.aggregate([
    /* unwind by tags */
    {"$unwind":"$tags"},
    /* now group by tags, counting each tag */
    {"$group": 
     {"_id":"$tags",
      "count":{$sum:1}
     }
    },
    /* sort by popularity */
    {"$sort":{"count":-1}},
    /* show me the top 10 */
    {"$limit": 10},
    /* change the name of _id to be tag */
    {"$project":
     {_id:0,
      'tag':'$_id',
      'count' : 1
     }
    }
])
```

### Double `$unwind`
```js
db.inventory.drop();
db.inventory.insert({'name':"Polo Shirt", 'sizes':["Small", "Medium", "Large"], 'colors':['navy', 'white', 'orange', 'red']})
db.inventory.insert({'name':"T-Shirt", 'sizes':["Small", "Medium", "Large", "X-Large"], 'colors':['navy', "black",  'orange', 'red']})
db.inventory.insert({'name':"Chino Pants", 'sizes':["32x32", "31x30", "36x32"], 'colors':['navy', 'white', 'orange', 'violet']})
db.inventory.aggregate([
    {$unwind: "$sizes"},
    {$unwind: "$colors"},
    /* create the color array */
    {$group: 
     {
	'_id': {name:"$name",size:"$sizes"},
	 'colors': {$push: "$colors"},
     }
    },
    /* create the size array */
    {$group: 
     {
	'_id': {'name':"$_id.name",
		'colors' : "$colors"},
	 'sizes': {$push: "$_id.size"}
     }
    },
    /* reshape for beauty */
    {$project: 
     {
	 _id:0,
	 "name":"$_id.name",
	 "sizes":1,
	 "colors": "$_id.colors"
     }
    }
])
```

### SQL to Aggregation mapping Chart
[link](https://docs.mongodb.org/manual/reference/sql-aggregation-comparison/)

### Limitations
[YouTube - limitations of aggregation](https://www.youtube.com/watch?v=U_gRSxEq3c0)