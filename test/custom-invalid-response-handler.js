'use strict';

const yesno = require('../yesno');


async function main () {
	const ok = await yesno({
		defaultValue: true,
		invalid: function ({ question, defaultValue, callback, yesValues, noValues }) {
		    process.stdout.write("\n Whoa. That was not a good answer. Well. No more tries for you.\n");
		},
		question: 'Ready to continue?',
		yesValues: [ 'groovy' ],
		noValues: [ 'or what' ]
	});

	console.log( ok ? 'Yes.' : 'No.');
}


main();
