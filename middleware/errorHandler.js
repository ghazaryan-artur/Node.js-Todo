exports.errorHandler = (err, req, res, next) => {
    console.log("error")
    console.log(err);
    res.status(err.status).json({
        success: false,
        error: err.msg,
    });
};