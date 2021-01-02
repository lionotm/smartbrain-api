const handleProfileGet = (req, res, knex) => { // :id syntax allows id to be anything
  const { id } = req.params;
  knex.select('*').from('users').where({id})
    .then(user => {
      if (user.length) { // if user not found will return [] 
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
  handleProfileGet
}