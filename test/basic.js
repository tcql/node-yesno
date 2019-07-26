'use strict';

const yesno = require('../yesno');


async function main () {
	const ok = await yesno({
		question: 'Are you sure you want to continue?'
	});

	console.log( ok ? 'Yay!' : 'Nope.');
}


main();
