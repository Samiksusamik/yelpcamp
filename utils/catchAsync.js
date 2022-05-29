// Catch errors in async middleware
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}