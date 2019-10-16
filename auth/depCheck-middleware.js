module.exports = department => {
    return (req, res, next) => {
        if (department === req.user.department) {
            next();
        } else {
            res.status(403).json({ message: "you have no access" });
        }
    };
}