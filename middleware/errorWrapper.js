module.exports = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
        next();
    } catch (error) {
        next(error);
    }
}