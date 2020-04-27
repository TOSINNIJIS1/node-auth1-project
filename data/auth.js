const bcrypt = require('bcryptjs');
const router = require('express').Router();

const db = require('./model.js');

router.post('/register', (req, res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 8);

    newUser.password = hash

    db.add(newUser).then(user => res.status(201).json({user}))
    .catch(err => res.status(500).json({message: 'problem with database', error: err}))
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.login({username})
    .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({message: "welcome"})
        } else {
            res.status(401).json({ message: "invalid creds"})
        }
    })
    .catch(err => res.status(500).json({message: '...Oops . . . problem with database', error: err}))
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send('unable to logout')
        } else {
            res.send('logged out')
        }
    })
})

module.exports = router