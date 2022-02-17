// Module imports & declarations
const express = require('express');
const app = express();

const cors = require('cors');

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));

// MongoDB connection driver
const dbo = require('./db/conn');

// Server listener
app.listen(port, () => {
	dbo.connectToServer(function (err) {
		if (err) console.error(err);

	});
	console.log('Express server listening on port: ' + port + '.');
});