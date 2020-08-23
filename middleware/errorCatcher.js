function errorCatcher(err, req, res, next) {
    const error = {
        error: err, 
        method: req.method, 
        url: req.url, 
        params: req.params, 
        query: req.query
    }
    res.status(err.code || 500).json(error);
    next();
}

module.exports ={ 
    errorCatcher
}