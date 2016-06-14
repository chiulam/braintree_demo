'use strict';

let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let braintree = require('braintree');
let credential = require('../credential');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

let gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: credential.merchantId,
	publicKey: credential.publicKey,
	privateKey: credential.privateKey
});

app.get('/', function (req, res) {
	res.send('webhook server');
});

app.post('/webhooks', function (req, res) {
	gateway.webhookNotification.parse(
		req.body.bt_signature,
		req.body.bt_payload,
		function (err, webhookNotification) {
			console.log('----------------------------------- Receive webhook');
			console.log(JSON.stringify(webhookNotification, 0, 4));

			// Save
			let filePath = `${__dirname}/sample_body/${webhookNotification.kind}_${webhookNotification.subject.subscription.id}.json`;
			fs.writeFileSync(filePath, JSON.stringify(webhookNotification, 0, 4));
		}
	);
	res.sendStatus(200);
});

app.listen(3000, function () {
	console.log('Webhook server listening on port 3000!');
});
