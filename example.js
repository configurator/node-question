#!/usr/bin/env node
"use strict";

console.error('An error has occurred.');

var question = require('./question');
question({
	prompt: '[R]etry, [A]bort, [I]gnore?',
	inputs: {
		r: function () {
			console.log('Retrying...');
			return 'Success';
		},
		a: function () {
			console.log('Aborting.');
			return 'Failure';
		},
		i: function () {
			console.log('Ignoring all of our problems.');
			return 'Success';
		}
	},
	retry: true,
	callback: function (err, result) {
		if (err) {
			console.error(err);
		} else {
			console.log(result);
		}
	}
});
