'use strict';

var readline = require('readline');


var options = {
    yes: [ 'yes', 'y' ],
    no:  [ 'no', 'n' ]
};


function defaultInvalidHandler (question, defaultvalue, callback, yesvalues, novalues) {
    process.stdout.write('\nInvalid Response.\n');
    process.stdout.write('Answer either yes : (' + yesvalues.join(', ')+') \n');
    process.stdout.write('Or no: (' + novalues.join(', ') + ') \n\n');
    ask(question, defaultvalue, callback, yesvalues, novalues);
}

var invalidHandlerFunction = defaultInvalidHandler;


function onInvalidHandler (callback) {
    invalidHandlerFunction = callback;
}


function ask (question, defaultvalue, callback, yesvalues, novalues) {
    if (!invalidHandlerFunction)
        invalidHandlerFunction = defaultInvalidHandler;

    yesvalues = yesvalues ? yesvalues : options.yes;
    novalues  = novalues  ? novalues : options.no;

    yesvalues = yesvalues.map(function (v) { return v.toLowerCase(); });
    novalues  = novalues.map(function (v) { return v.toLowerCase(); });

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question + ' ', (answer) => {
        rl.close();

        var result;
        var cleaned = answer.trim().toLowerCase();

        if (cleaned == '' && defaultvalue != null) {
            result = defaultvalue;
        }
        else if (yesvalues.indexOf(cleaned) >= 0) {
            result = true;
        }
        else if (novalues.indexOf(cleaned) >= 0) {
            result = false;
        }
        else {
            invalidHandlerFunction(question, defaultvalue, callback, yesvalues, novalues);
            return;
        }

        callback(result);
    });
}


function askAsync (question, defaultvalue, yesvalues, novalues) {
    return new Promise(function (resolve, reject) {
        ask (question, defaultvalue, function (askResult) {
            resolve(askResult);
        }, yesvalues, novalues)
    });
}


module.exports = {
    ask: ask,
    askAsync: askAsync,
    onInvalidHandler: onInvalidHandler,
    options: options
};
