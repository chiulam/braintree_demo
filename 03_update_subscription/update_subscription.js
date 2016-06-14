'use strict';

let braintree = require('braintree');
let gateway = require('../gateway');

gateway.subscription.update('subscription_id', {
	paymentMethodToken: 'demo_user_002'
}, function (err, result) {
	console.log(err);
	console.log(result);
});
