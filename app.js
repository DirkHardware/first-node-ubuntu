const EventEmitter = require('events');
// const emitter = new EventEmitter();
// const emitter2 = new EventEmitter();


// Register a logging listener

const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('messageLogging', (name) => {
    console.log('Listener called', name)
    });
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg.url);
    });

logger.log('message', 'Anderson')