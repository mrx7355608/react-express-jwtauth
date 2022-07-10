module.exports = (err, req, res, next) => {
    return res.status(400).json({
        ok: false,
        error: err.message,
    });
};
