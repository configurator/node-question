"use strict";

var util = require('util'),
    keypress = require('keypress');

keypress(process.stdin);

var identity = function (x) { return x; }

var arrayToObject = function (array) {
    if (!util.isArray(array)) {
        return array;
    }
    
    var result = {};
    for (var i = 0; i < array.length; i++) {
        result[array[i]] = identity;
    }
    return result;
};

// Options: {
//      stdin {process.stdin}: The stream to read from
//
//      stdout {process.stdout}: The stream to write the question to
//
//      callback {undefined}: function (err, input) called with the user's input
//
//      caseSensitive {false}: if false, reply will always be lower-cased; if true, reply is case sensitive
//
//      retry {false}: if true an invalid input is pressed, the question is asked again.
//
//      prompt {undefined}: The question to ask the user
//
//      inputs {undefined}: either
//        - A string or array of valid inputs, e.g. 'yni' or ['y', 'n', 'i'] for a "[Y]es, [No], [I]gnore" query
//        - An object with each key as the input and its value as a callback to be executed when pressed.
//              If both this callback and a global callback exists, the global callback will receive this callback's result as input
// }
var question = function (options, callback) {
    callback = callback || options.callback;
    var stdin = options.stdin || process.stdin,
        stdout = options.stdout || process.stdout,
        caseFix = options.caseSensitive ? identity : function (x) { return x.toLowerCase(); },
        prompt = options.prompt,
        inputs = arrayToObject(options.inputs),
        
        retry = options.retry
            ? function (x) {
                if (prompt) {
                    stdout.write('Invalid input ' + x + '\n\n');
                }
                ask();
            } : function (x) {
                if (callback) {
                    callback('Invalid input ' + x);
                }
            },
            
        ask = function () {
            if (prompt) {
                stdout.write(prompt + ' ');
            }
            
            stdin.once('keypress', keypress);
            stdin.resume();
        },
        
        keypress = function (key) {
            stdin.pause();
            
            if (prompt) {
                stdout.write('\n');
            }
            
            key = caseFix(key);
            
            if (inputs) {
                var inputCallback = inputs[key];
                if (!inputCallback) {
                    // Not a valid input
                    return retry(key);
                }
                
                key = inputCallback(key);
            }
            
            if (callback) {
                callback(null, key);
            }
        };
    
    process.stdin.isTTY && stdin.setRawMode(true);
    ask();
};

module.exports = question;
