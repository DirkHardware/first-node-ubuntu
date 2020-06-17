const express = require('express')
const server = express()
const Joi = require('@hapi/joi')
const { Schema } = require('mongoose')
const { countReset } = require('console')
const { resolveSoa } = require('dns')

server.use(express.json())

const genres = [
    { id: 1, name: "Sci-fi"},
    { id: 2, name: "Anime"},
    { id: 3, name: "War"},
    { id: 4, name: "Cult"},
]

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.get('/api/genres/', (req, res) => {
    res.send(genres)
});

server.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genre)
});

server.get('/api/genres/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id))

    if(!genre) return res.status(404).send('Genre not found')
    res.send(genre)
});

server.put('/api/genres/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(404).send('Genre not found')

    const { error } = validateGenre(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name
    res.send(genre);
});

server.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id))
    console.log(genre)

    if(!genre) return res.status(404).send('Genre not found')

    const { error } = validateGenre(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    const index = genres.indexOf(genre);
    genres.splice(index, 1)

    res.send(genre)

});


function validateGenre(genre){
    const schema = Joi.object({

        name: Joi.string()
        .min(3)
        .required()
    });

    return schema.validate(genre)
}

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`Listening on port ${port}`))
