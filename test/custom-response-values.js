'use strict';

const yesno = require('../yesno');


async function main () {
	const ok = await yesno({
		defaultValue: true,
		question: 'Dude, Is this groovy or what?',
		yesValues: [ 'groovy' ],
		noValues: [ 'or what' ]
	});

	console.log( ok ? 'Tubular.' : 'Aw, why you gotta be like that?');
}


main();
