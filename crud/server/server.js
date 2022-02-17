// Module imports
const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const dbo = require('./db/conn'); // MongoDB connection driver

// Declare env vars path
env.config({ path: './config.env' });

// Declarations
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));

// Server listener
app.listen(port, () => {
	dbo.connectToServer(function (err) {
		if (err) console.error(err);

	});
	console.log('Express server listening on port: ' + port + '.');
});