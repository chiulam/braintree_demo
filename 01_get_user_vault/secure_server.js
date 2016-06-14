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

app.get('/index', function (req, res) {
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			console.log('o no err!');
			console.log(err);
		} else {
			console.log('clientToken!!');
			console.log(response.clientToken);
			res.send(index.replace('CLIENT-TOKEN-FROM-SERVER', response.clientToken));
		}
	});
});

app.post('/add_paypal_as_payment_method', function (req, res) {
	console.log(req.body);
	console.log(req.form);
	let nonceFromTheClient = req.body.payment_method_nonce;
	// Use payment method nonce here

	console.log('nonceFromTheClient!!!');
	console.log(nonceFromTheClient);

	// gateway.customer.create({
	// 	firstName: 'Charity',
	// 	lastName: 'Smith Paypal',
	// 	paymentMethodNonce: nonceFromTheClient
	// }, function (err, result) {
	// 	console.log(result.success);
	// 	// true
	//
	// 	console.log(result.customer);
	// 	// e.g 160923
	//
	// 	// console.log(result.customer.paymentMethods[0].token);
	// 	// e.g f28wm
	// });

	res.send('nonce = ' + nonceFromTheClient);
});

app.listen(3001, function () {
	console.log('Secure server listening on port 3001!');
});
