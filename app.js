
// Imports the Logger event class from logger.js, allowing us to create a local instance of that class as logger on line 5

const Logger = require('./logger');
const logger = new Logger();

let i = 0;
let notname = 'not the name variable';

// Register a listener
// This structure is counterintuitive but it works as follows:
// logger.on sends the first and second argument to the logger class in logger.js. The "messageLogging" and "messageLogged" arguments are keywords which,
// when matched to their counterparts in in the emmitter methods in logger.js, fire their emitters.

logger.on('messageLogging', (name) => {
    // console.log here actually prints the second argument in the emit function in the logger.js module. I don't know how it does this, but without it
    // you won't see the text in the emitter.
    console.log(name);

    // Curiously, when given a console.log without a corresponding argument in the Logger class' arguments, it will not print the emitter message but
    // will behave normally, as observed with the i and notname variables
    i++ 
    console.log(i);
    console.log(notname);
    });
logger.on('messageLogged', (arg) => {
    console.log(arg);
    });


// Without this logger.log function though, the console.log functions in our .on methods, they will not have access to the either the fire keywords data 
// in the logger.js class/instance and NOTHING will fire
logger.log('Anderson', { id: 1, url: 'website.com'});