const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1', // local host
    user : '', 
    password : '',
    database : 'smartbrain'
  }
});


const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json()); // required to parse JSON
app.use(cors());


app.get('/', (req, res) => {
  res.send('success');
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, knex, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, knex, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, knex)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, knex)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
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