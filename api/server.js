const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);

server.use('/api', authRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
