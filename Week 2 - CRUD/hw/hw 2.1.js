// import *.csv
// mongoimport --type csv --headerline weather_data.csv -d weather -c data

db.data.find({"Wind Direction":{$gt:180,$lt:360}}).sort({"Temperature":1}).limit(5).pretty();