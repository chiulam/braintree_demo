'use strict';

let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

let gateway = require('../gateway');

app.get('/', function (req, res) {
	res.send('webhook server');
});

/*
	Endpoint for receive webhook
*/
app.post('/webhooks', function (req, res) {
	// console.log('-------------- raw response');
	// console.log(req.body);

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
