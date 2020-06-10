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

//Node does not suffer from the issue Rails (and I think React Routes?) has where URLs must be listed in order of most complex to most root in order for more complex URLs to not simply direct you to their nearest listed root. 

server.get('/api/courses/:id', (req, res) => {
    res.send(req.params)
})

server.get('/blog/posts/:id/:year/:month', (req, res) => {
    //returns query strings. See chapter 47 - Route parameters
    res.send(req.query)
})

// PORT is an environmental variable.
// Ports are assigned dynamically by servers, so we need to set the the port we use with the PORT variable
//You can set your PORT environment variable manually with export PORT={port number} in terminal
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`))