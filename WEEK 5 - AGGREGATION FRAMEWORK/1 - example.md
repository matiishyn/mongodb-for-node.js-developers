###Simple Aggregation Example
Write the aggregation query that will find the number of products by category of a collection that has the form:

```json
{
	"_id" : ObjectId("50b1aa983b3d0043b51b2c52"),
	"name" : "Nexus 7",
	"category" : "Tablets",
	"manufacturer" : "Google",
	"price" : 199
}
```

Have the resulting key be called "num_products," as in the video lesson. Hint, you just need to change which key you are aggregating on relative to the examples shown in the lesson.

```bash
db.products.aggregate([
    {$group:
     {
	 _id:"$category",
	 num_products:{$sum:1}
     }
    }
])
```
