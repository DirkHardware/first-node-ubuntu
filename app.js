const EventEmitter = require('events');
const emitter = new EventEmitter();
const emitter2 = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg.url);
});

// Register a logging listener
emitter2.on('Logging', (arg) => {
    console.log(`Calm down ${arg} you jackass Im logging`)
})

emitter2.emit('Logging', "Anderson")

// Raise an event
emitter.emit('messageLogged', { id: 1, url: 'dicks.com'});

// Raise: logging (data: message

