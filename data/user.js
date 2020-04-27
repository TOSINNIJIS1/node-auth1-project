const router = require('express').Router();

const db = require('./model.js');

router.get('/', (req, res) => {
        db.info()
        .then(user => res.status(400).json(user))
        .catch(err => res.status(500).json({errMessage: 'error', error: err}))
})

module.exports = router