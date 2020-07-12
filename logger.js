function log(req, res, next){
    //Next is a reference to the next middleware function in the pipeline
        console.log('Logging...');
        // If you don't use next, the cycle will hang.
        next()
    };

module.exports = log;