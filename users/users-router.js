const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const checkDep = require('../auth/depCheck-middleware.js');
const secrets = require('../config/secretConfig.js');

router.get('/', restricted, checkDep('lambda'), (req, res) => {
  Users.find()
    .then(users => {
      res.json({ loggedInUser: req.username, users });
    })
    .catch(err => res.send(err));
});

router.get('/department', restricted, (req, res) => {
    const token = req.headers.authorization

    const decodedDepartment = extractUserDepartment(token)
      
    Users.findByDepartment(decodedDepartment)
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'error retrieving users' }))
});


function extractUserDepartment(token) {
    let userDepartment = ''
    
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        userDepartment = decodedToken.department;
    })
    
    return userDepartment
}
 


module.exports = router;
