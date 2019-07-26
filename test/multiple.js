'use strict';

var yesno = require('../yesno');


function ask() {
	yesno.ask('Are you sure you want to continue?', true, function (ok) {
	    if (ok) {
	        console.log('Yay!\n');
	    } else {
	        console.log('Nope.');
	        ask();
	    }
	});
}

ask();
