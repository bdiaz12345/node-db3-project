// scheme-model
const db = require('../../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes').where('id', id).first()
}

function findSteps(id) {
    return db('schemes as s')
        .join('steps as z', 'z.scheme_id', 's.id')
        .where('s.id', id)
        .select('*')
}

function add(scheme) {
    return db('schemes').insert(scheme)
        .then(([id]) => {
            return db('schemes').where('id', id).first()
        })
}

function update(changes, id) {
    const schemeId = id
    return db('schemes').where('id', id).update(changes)
        .then(() => {
            return db('schemes').where('id', schemeId).first()
        })
}

function remove(id) {
    return db('schemes').where('id', id).del()
        .then(() => {
            return db('schemes')
        })
}