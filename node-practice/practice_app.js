const express = require('express')
const server = express()
const Joi = require('@hapi/joi')

server.use(express.json())

const genres = [
    { id: 1, name: "Sci-fi"},
    { id: 2, name: "Anime"},
    { id: 3, name: "War"},
    { id: 4, name: "Cult"},
]