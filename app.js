const express = require('express')
const server = express();

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/unknown/hinson', (req, res) => {
    res.send(JSON.stringify(["Get your yankee ass of my property.\nI don't care if the bank gave you the deed.", 5, true]))
});

server.get('/api/courses', (req, res) => {
    res.send([343, 2501, "How to fist fight a bear"])
});


server.listen(3000, () => console.log('Listening on port 3000'))