const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '880fd337577f47aa8035ba1fc86edd5e'
 }); 

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const imageCountIncrease = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable to access entries.'))
}

module.exports = {
  imageCountIncrease,
  handleApiCall
}