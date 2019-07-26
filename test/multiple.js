'use strict';

const yesno = require('../yesno');


async function main () {
	let done = false;

	while (!done) {
		done = await yesno({
			defaultValue: true,
			question: 'Are you sure you want to continue?'
		});

		console.log( done ? 'Yay!' : 'Nope.');
	}
}


main();
