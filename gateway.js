'use strict';

let braintree = require('braintree');

// Paste your credential here
let gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: '',
	publicKey: '',
	privateKey: ''
});

module.exports = gateway;
