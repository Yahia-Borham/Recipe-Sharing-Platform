




class Upgraded_Error extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = "Failed"
        this.isoperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = Upgraded_Error;