This microlibrary has exactly one function, _question_, which asks the commandline user a question and awaits a single-key response.

## installation ##

    npm install simple-question
    
## usage ##

The only export from this library is the question function itself.

    var question = require('simple-question');
    question(options);

Available options are:

    Options: {
        stdin {process.stdin}: The stream to read from
    
        stdout {process.stdout}: The stream to write the question to
    
        callback {undefined}: function (err, input) called with the user's input
    
        caseSensitive {false}: if false, reply will always be lower-cased; if true, reply is case sensitive
    
        retry {false}: if true an invalid input is pressed, the question is asked again.
    
        prompt {undefined}: The question to ask the user
    
        inputs {[]}: either
          - A string or array of valid inputs, e.g. 'yni' or ['y', 'n', 'i'] for a "[Y]es, [No], [I]gnore" query
          - An object with each key as the input and its value as a callback to be executed when pressed.
                If both this callback and a global callback exists, the global callback will receive this callback's result as input
    }

For a simple, yet mostly complete, see (example.js)[https://github.com/configurator/node-question/blob/master/example.js].
