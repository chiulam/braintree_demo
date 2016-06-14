'use strict';

let braintree = require('braintree');
let gateway = require('../gateway');

gateway.subscription.retryCharge('subscription_id', function (err, result) {
	console.log(err);
	console.log(result);
});
