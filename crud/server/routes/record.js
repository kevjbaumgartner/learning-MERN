// Module imports
const express = require('express');
const dbo = require('../db/conn'); // MongoDB connection driver

// Express router
const recordRoutes = express.Router();

// Declarations
const ObjectId = require("mongodb").ObjectId;

// Routes - Record
recordRoutes.route('/record').get(function (req, res) { // All records
	let db_connect = dbo.getDb('employees');
	db_connect
		.connection('records')
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
		.connection('records')
		.findOne(query, function (err, result) {
			if (err) throw (err);
			res.json(result);
		});
});

recordRoutes.route('/record/add').post(function (req, res) { // Add a record
	let db_connect = dbo.getDb();
	let obj = {
		person_name: req.body.person_name,
		person_position: req.body.person_position,
		person_level: req.body.person_level
	};
	db_connect
		.collection('records')
		.insertOne(obj, function (err, res) {
			if (err) throw (err);
			res.json(res);
		});
});

recordRoutes.route('/update/:id').post(function (req, res) { // Update a record
	let db_connect = dbo.getDb();
	let query = { _id: ObjectId(req.params.id) };
	let vals = {
		$set: {
			person_name: req.body.person_name,
			person_position: req.body.person_position,
			person_level: req.body.person_level
		}
	};
	db_connect
		.collection('records')
		.updateOne(query, vals, function (err, res) {
			if (err) throw (err);
			console.log("1 record updated.");
			res.json(res);
		});
});

recordRoutes.route('/delete/:id').delete((req, res) => {
	let db_connect = dbo.getDb();
	let query = { _id: ObjectId(req.params.id) };
	db_connect.collection('records').deleteOne(query, function (err, obj) {
		if (err) throw (err);
		console.log('1 record deleted.');
		res.status(obj);
	});
});

module.exports = recordRoutes;