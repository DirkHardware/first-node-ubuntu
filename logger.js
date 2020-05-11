const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(name, arg) {
        //send http request
        this.emit('messageLogging', `Calm down ${name} you jackass Im logging`)
        this.emit('messageLogged', `Going to ${arg.url}`);
    };
};

module.exports = Logger;