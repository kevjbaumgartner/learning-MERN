// Module imports
const express = require('express');
const dbo = require('../db/conn'); // MongoDB connection driver

// Express router
const recordRoutes = express.Router();

// Declarations
const ObjectId = require("mongodb").ObjectId;

// Routes - Record
recordRoutes.route('/record').get(function (req, res) { // All records
	let db_connect = dbo.getDb();
	db_connect
		.collection('records')
		.find({})
		.toArray(function (err, result) {
			if (err) throw (err);
			res.json(result);
		});
});

recordRoutes.route('/record/:id').get(function (req, res) { // Single record
	let db_connect = dbo.getDb();
	let query = { _id: ObjectId(req.params.id) };
	db_connect
		.collection('records')
		.findOne(query, function (err, result) {
			if (err) throw (err);
			res.json(result);
		});
});

recordRoutes.route('/record/add').post(function (req, _res) { // Add a record
	let db_connect = dbo.getDb();
	let obj = {
		name: req.body.name,
		position: req.body.position,
		level: req.body.level
	};
	console.log(obj);
	db_connect
		.collection('records')
		.insertOne(obj, function (err, res) {
			if (err) throw (err);
			_res.json(res);
		});
});

recordRoutes.route('/update/:id').post(function (req, _res) { // Update a record
	let db_connect = dbo.getDb();
	let query = { _id: ObjectId(req.params.id) };
	let vals = {
		$set: {
			name: req.body.name,
			position: req.body.position,
			level: req.body.level
		}
	};
	db_connect
		.collection('records')
		.updateOne(query, vals, function (err, res) {
			if (err) throw (err);
			console.log("1 record updated.");
			_res.json(res);
		});
});

recordRoutes.route('/delete/:id').delete((req, _res) => { // Delete a record
	let db_connect = dbo.getDb();
	let query = { _id: ObjectId(req.params.id) };
	db_connect.collection('records').deleteOne(query, function (err, res) {
		if (err) throw (err);
		console.log('1 record deleted.');
		_res.json(res);
	});
});

module.exports = recordRoutes;