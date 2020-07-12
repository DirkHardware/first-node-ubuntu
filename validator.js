function validateCourse(req, res, next){
    // @hapi/joi requires a schema to validate data. It is defined as a const below
    const schema = Joi.object({
        // Joi will throw a validation error when it hits the first failed requirement.
        id: Joi.number(),
        name: Joi.string()
        .min(5)
        .required()
    })};

module.exports = validate