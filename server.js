const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')

const userRouter = require('./data/user.js');
const auth = require('./data/auth.js');

const restricted = require('./data/restrict.js')
const knexSessionStore = require('connect-session-knex')(session)



const  server = express();

const sessionConfig = {
    name: 'chocolate-chip',
    secret: 'mycrushonapu',
    cookie: {
        maxAge: 3600 * 1000,
        secure:  false,
        httpOnly: true
    },
    resave: false,
    saveUnitialized: false,

    store: new knexSessionStore(
        {
            knex: require('./dbconfig.js'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 3600 * 1000
        }
    )
}

server.use(helmet());
server.use(express.json());
server.use(cors())
server.use(session(sessionConfig))

server.use('/api/users', restricted, userRouter);
server.use('/api/auth', auth);


server.get('/', (req, res) => {
    res.json({ api : "running" });
});


module.exports = server;
