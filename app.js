const express = require('express')
const server = express();
const Joi = require('@hapi/joi');
const { rest } = require('underscore');

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
    //INPUT VALIDATION:
    // @hapi/joi requires a schema to validate data. It is defined as a const below
    const schema = Joi.object({
        // Joi will throw a validation error when it hits the first failed requirement.
        id: Joi.number()
        .integer()
        .required(),

        name: Joi.string()
        .min(5)
        .required()
    });

    //line above demands string be minimum 3 characters

    //The chapter for joi is outdated. You must execute the validate method on your schema, instead of on the Joi object with schema as an argument.
    const result = schema.validate(req.body);
    console.log(result);

    if (result.error) {
        //the below code sends out the first error notice in the array only
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else {
        const course = {
            id: req.body.id,
            name: req.body.name
        }
        courses.push(course)
        res.send(course)
    };

    // const course = {
    //     id: courses.length + 1,
    //     name: req.body.name
    // }

    //commented this out during the validation chapter because it was creating new courses even when Joi threw a validation error
    // courses.push(course);
    // res.send(course);
})

// PORT is an environmental variable.
// Ports are assigned dynamically by servers, so we need to set the the port we use with the PORT variable
//You can set your PORT environment variable manually with export PORT={port number} in terminal
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`))


//Julia is a nerd and when I save this it will show up in another text editor 
