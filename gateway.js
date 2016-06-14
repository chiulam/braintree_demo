'use strict';

let braintree = require('braintree');

module.exports = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: '',
	publicKey: '',
	privateKey: ''
});
