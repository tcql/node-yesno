'use strict';

const readline = require('readline');


const options = {
    yes: [ 'yes', 'y' ],
    no:  [ 'no', 'n' ]
};


function defaultInvalidHandler ({ question, defaultValue, yesValues, noValues }) {
    var yValues = (yesValues || options.yes);
    var nValues  = (noValues || options.no);

    process.stdout.write('\nInvalid Response.\n');
    process.stdout.write('Answer either yes : (' + yValues.join(', ') + ') \n');
    process.stdout.write('Or no: (' + nValues.join(', ') + ') \n\n');
}


async function ask ({ question, defaultValue, yesValues, noValues, invalid }) {
    if (!invalid || typeof invalid !== 'function')
        invalid = defaultInvalidHandler;

    var yValues = (yesValues || options.yes).map((v) => v.toLowerCase());
    var nValues  = (noValues || options.no).map((v) => v.toLowerCase());

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(function (resolve, reject) {
        rl.question(question + ' ', async function (answer) {
            rl.close();

            const cleaned = answer.trim().toLowerCase();

            if (cleaned == '' && defaultValue != null)
                return resolve(defaultValue);

            if (yValues.indexOf(cleaned) >= 0)
                return resolve(true);
                
            if (nValues.indexOf(cleaned) >= 0)
                return resolve(false);
    
            invalid({ question, defaultValue, yesValues, noValues });
            const result = await ask({ question, defaultValue, yesValues, noValues, invalid });
            resolve(result);
        });
    });
}


module.exports = ask;
