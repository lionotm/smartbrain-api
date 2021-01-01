const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json()); // required to parse JSON
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'Kukid',
      email: 'kukid@gmail.com',
      password: 'mug',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Collin',
      email: 'nkw@gmail.com',
      password: 'tota',
      entries: 0,
      joined: new Date()
    },
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const { email, name } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => { // :id syntax allows id to be anything
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    } 
  })
  if (!found) {
    res.status(400).json("not found");
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    } 
  })
  if (!found) {
    res.status(400).json("not found");
  }
})

app.listen(3000, () => {
  console.log('app running on port 3000');
})

/* 
--> res = this is working
signin --> POST = success/fail
register --> POST = user
profile/:uderId --> GET = user
image --> PUT --> user score
*/