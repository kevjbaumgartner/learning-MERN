// Module imports && declarations
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const Db = process.env.DB_URI;
const client = new MongoClient(Db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Class db variable
var _db;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (db) {
				_db = db.db('crud');
				console.log("Successfully connected to MongoDB.");
			}
			return callback(err);
		});
	},

	getDb: function () {
		return _db;
	}
};