const EventEmitter = require('events');

var url = 'http://mylogger.io/log'

class Logger extends EventEmitter {
    log(message, name) {
        //send http request
        console.log(message)
        this.emit('messageLogging', `Calm down ${name} you jackass Im logging`)
        this.emit('messageLogged', { id: 1, url: 'dicks.com'});
    };
};

module.exports = Logger;