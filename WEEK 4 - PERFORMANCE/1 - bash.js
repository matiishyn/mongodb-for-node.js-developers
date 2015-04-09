// WiredTiger
killall mongod
mkdir WT
mongod -dbpath WT -storageEngine wiredTiger
mongo // use WT
    db.foo.stats(); // info