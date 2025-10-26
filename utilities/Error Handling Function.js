





const Error_Handling_Function = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    res.status(err.statusCode).json({
        Status: err.status,
        Name: err.name,
        Message: err.message,
        Stack: err.stack
    })

}

module.exports = Error_Handling_Function;