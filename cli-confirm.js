
module.exports = {
    options : {
        yes:    ['yes','y','true'],
        no:     ['no','n','false']
    },

    confirm : function (question, defaultvalue, callback, yesvalues, novalues) {
        self = this

        yesvalues = yesvalues ? yesvalues : this.options.yes;
        novalues  = novalues  ? novalues : this.options.no;

        process.stdout.write(question);
        process.stdin.setEncoding('utf8');
        process.stdin.once('data', function(val){
            var result;
            if (val.trim() == "") {
                result = defaultvalue;
            }
            else if (yesvalues.indexOf(val.trim()) >= 0) {
                result = true;
            }
            else if (novalues.indexOf(val.trim()) >= 0) {
                result = false;
            }
            else {
                self.__invalid(question,defaultvalue,callback,yesvalues,novalues);
                return;
            }

            callback(result);
        }).resume();
    },

    onInvalidHandler: function(callback) {
        this.__invalid = callback;
    },


    _invalidHandler: function(question, defaultvalue, callback, yesvalues, novalues) {
        process.stdout.write("\nInvalid Response.\n");
        process.stdout.write("Answer either yes : ("+ yesvalues.join(', ')+') \n')
        process.stdout.write("Or no: ("+ novalues.join(', ')+') \n\n')
        this.confirm(question,defaultvalue,callback,yesvalues,novalues);
    },

    resetInvalidHandler: function() {
        this.onInvalidHandler(this.invalidHandler);
    }

}