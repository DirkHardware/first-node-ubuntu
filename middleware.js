const express = require('express')
const server = express();
const Joi = require('@hapi/joi');
const logger = require('./logger')
const { rest } = require('underscore');

//wtf is .use?
//turns out use is a method for calling the express object, which is just a collection of middleware
server.use(express.json())

//We can utilize the .use() method to call our own middleware
// For example

// server.use(function(req, res, next){
// //Next is a reference to the next middleware function in the pipeline
//     console.log('Logging...');
//     // If you don't use next, the cycle will hang.
//     next()
// });
// ^^^ Note how the middleware above immediately kicks in with any kind of request
// Each custom middlware function should be in a seperate module
server.use(logger);


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
    //.find is a node method that takes an argument and iterates over an array. Much like piping in ruby, the parens take an argument which is a name for the currently iterated variable (think of: do |arbitrary_variable_name| in Ruby), and then a function containing the criterea that must be met for the proper datum to be returned. Remember to parseInt for id nums, as everything is returned as a string. Find returns THE FIRST value in an array to match the params
    const course = courses.find(c => c.id === parseInt(req.params.id))
    
    if (!course) return res.status(404).send('Course not found'); 
    res.send(course);
})

server.get('/blog/posts/:id/:year/:month', (req, res) => {
    //returns query strings. See chapter 47 - Route parameters
    res.send(req.query)
})

server.post('/api/courses', (req, res) => {
    // INPUT VALIDATION:

   const { error } = validateCourse(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: req.body.id,
        name: req.body.name
    }
    courses.push(course)
    res.send(course) 
})

server.put('/api/courses/:id', (req, res) => {
    //Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //If not extant, 404
    if (!course) return res.status(404).send('The course with the given ID was not found')

    //Validate
    //If invalid, return 400 - bad request
    
    const { error } = validateCourse(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);
})

server.delete('/api/courses/:id', (req, res) => {
    //Look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //Not existing, return 404
    if (!course) 
    //Remember your returns! Before we added the return, node was just going ahead with the function and deleting the last course in the array when it couldn't find a course
        return res.status(404).send("No course with that ID exists")

    //Delete
    //IndexOf is an Array method returns the index of the value in the argument
    const index = courses.indexOf(course);
    //splice deletes or adds things to array, check W3 schools for args
    courses.splice(index, 1)

    //Return the same course
    res.send(course)
})

function validateCourse(course){
    // @hapi/joi requires a schema to validate data. It is defined as a const below
    const schema = Joi.object({
        // Joi will throw a validation error when it hits the first failed requirement.
        id: Joi.number(),
        name: Joi.string()
        .min(5)
        .required()
    });

    
    //The chapter for joi is outdated. You must execute the validate method on your schema, instead of on the Joi object with schema as an argument.
    return schema.validate(course);

}

// PORT is an environmental variable.
// Ports are assigned dynamically by servers, so we need to set the the port we use with the PORT variable
//You can set your PORT environment variable manually with export PORT={port number} in terminal
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`))


//Julia is a nerd and when I save this it will show up in another text editor 
