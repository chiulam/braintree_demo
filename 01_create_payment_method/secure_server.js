'use strict';

let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let braintree = require('braintree');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

let gateway = require('../gateway');
let index = fs.readFileSync(__dirname + '/index.html', 'utf8');

app.get('/', function (req, res) {
	res.send('secure server');
});

/*
	Generate web frontend
*/
app.get('/index', function (req, res) {
	// Get token
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			console.log(err);
		} else {
			console.log('clientToken!!');
			console.log(response.clientToken);
			// replace token in FE code
			res.send(index.replace('CLIENT-TOKEN-FROM-SERVER', response.clientToken));
		}
	});
});

/*
	Create payment method
*/
app.post('/add_paypal_as_payment_method', function (req, res) {
	let nonceFromTheClient = req.body.payment_method_nonce;

	// Use payment method nonce here
	console.log('nonceFromTheClient!!!');
	console.log(nonceFromTheClient);


	// Create customer first
	let id = 'demo_user';
	gateway.customer.create({
		id: id,
		firstName: 'Demo',
		lastName: 'Zero One'
	}, function (err, result) {
		console.log(result.success);
		console.log(result.customer);

		// Create paymentMethods with nonceFromTheClient
		gateway.paymentMethod.create({
			customerId: id,
			paymentMethodNonce: nonceFromTheClient,
			token: id + '_001'
		}, function (err1, result1) {
			res.send('nonce = ' + nonceFromTheClient);
		});
	});
});

app.listen(3001, function () {
	console.log('Secure server listening on port 3001!');
});
