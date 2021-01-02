
const handleRegister = (req, res, knex, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) { //check for valid inputs
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    knex.transaction(trx => { // to link 2 db
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*') // return all cols
          .insert({
            email: loginEmail[0], // because loginEmail is an array
            name: name,
            joined: new Date()
          }).then(user => {
            res.json(user[0]);
        })
      })
      .then(trx.commit) // commit data entry if no error in both db
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
}