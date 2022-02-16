// Module imports
const express = require('express');
const mongo = require('mongodb');
const url = require('url');

// Declarations
const app = express();
const MongoClient = mongo.MongoClient;
const port = (process.env.port || 3005);

// Server listener
app.listen(port, () => {
	console.log("Server listening on port: " + port + ".");
});

// Server GET route
app.get("/search", (req, res) => {
	// MongoDB connection
	MongoClient.connect("mongodb://localhost:27017/mtg", (err, client) => {
		if (err) throw err;

		// MongoDB query e.g. http://localhost:3005/search?name=Chandra,%20Torch%20of%20Defiance
		const db = client.db('mtg');
		let parsedUrl = url.parse(req.url, true);
		let cardName = parsedUrl.query.name;
		let queryStr = { name: cardName };

		db.collection('cards').find(queryStr).toArray((err, result) => {
			if (err) throw err;
			res.send("<img src=" + result[1].image_uris.normal + "></img>");
		});
	});
});