module.exports = department => {
    return (req, res, next) => {
        if (department === req.user.department) {
            next();
        } else {
            res.status(403).json({ message: "You shall not pass!" });
        }
    };
}