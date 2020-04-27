const db = require('../dbconfig.js')

function info() {
    return db('users')
    .select('id', 'username');
}

function findId(id) {
    return db('users')
    .where({ id })
    .first();
}

function add(newUser) {
    return db('users')
    .insert(newUser, "id")
    .then(ids => {
        const [id] = ids;
        return findId(id)
    })
}

function login(info) {
    return db('users')
    .where(info)
}

module.exports = {info, add, findId, login};