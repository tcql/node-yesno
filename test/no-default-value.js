'use strict';

var yesno = require('../yesno');


async function main () {
	await yesno({
		question: "Are you sure you want to 'rm-rf /' ?"
	});
}


main();


