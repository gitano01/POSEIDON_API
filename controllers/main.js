const getTableData = (req, res, db) => {
    db.select('*').from('users')
        .then(items => {
            if(items.length){
                res.json(items)
            } else {
                res.json({dataExists: 'false'})
            }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
    const { id,username, password, created_at} = req.body
    const added = new Date()
    db('users').insert({id, username, password,created_at})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
    const { id, username } = req.body
    db('users').where({id}).update({username})
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('users').where({id}).del()
        .then(() => {
            res.json({delete: 'true'})
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
}
