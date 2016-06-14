'use strict';

let braintree = require('braintree');
let gateway = require('../gateway');

gateway.subscription.create({
	// for convenient, customise id to 'subscription_id'
	// in production, let braintree create subscription_id for us
	id: 'subscription_id',
	paymentMethodToken: 'demo_user_001',
	planId: 'monthly_fee'
}, function (err, result) {
	console.log(err);
	console.log(result);
});
