const Clarifai = require ('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI // api key on heroku server
 });

 const handleApiCall = (req, res) => {
   app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
 }

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}