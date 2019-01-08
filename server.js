require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')

// Connection URL
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

app.use(cors())

let db;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  db = client.db(dbName);
});

app.get('/directory', (req, res) => {
  db.collection('fashion-places').find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result)
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
