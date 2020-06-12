const express = require('express')
const server = express();

//wtf is .use?
server.use(express.json())

const courses = [
    { id: 1, name: "fight a bear"},
    { id: 2, name: "defuse a bomb"},
    { id: 3, name: "win a kung-fu death tournament"}
];

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/unknown/hinson', (req, res) => {
    res.send(JSON.stringify(["Get your yankee ass of my property.\nI don't care if the bank gave you the deed.", 5, true]))
});

server.get('/api/courses/', (req, res) => {
    res.send(courses)
});

//Node does not suffer from the issue Rails (and I think React Routes?) has where URLs must be listed in order of most complex to most root in order for more complex URLs to not simply direct you to their nearest listed root. 

server.get('/api/courses/:id', (req, res) => {
    //.find is a node method that takes an argument and iterates over an array. Much like piping in ruby, the parens take an argument which is a name for the currently iterated variable (think of: do |arbitrary_variable_name| in Ruby), and then a function containing the criterea that must be met for the proper datum to be returned. Remember to parseInt for id nums, as everything is returned as a string.
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('Course not found'); 
    res.send(course);
})

server.get('/blog/posts/:id/:year/:month', (req, res) => {
    //returns query strings. See chapter 47 - Route parameters
    res.send(req.query)
})

server.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

// PORT is an environmental variable.
// Ports are assigned dynamically by servers, so we need to set the the port we use with the PORT variable
//You can set your PORT environment variable manually with export PORT={port number} in terminal
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`))


//Julia is a nerd and when I save this it will show up in another text editor 
