const db = "mongodb+srv://createsometh:SkUQPDB5z6DKyP4I@cluster0.damcu31.mongodb.net/dashboard-db";
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const States = require('./models/StateScheme');

mongoose.connect(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const states = await States.find({});
    res.render('index', { states: states });
  } catch (err) {
    console.log(err);
  }
});
app.get('/api/states', async (req, res) => {
  try {
    const states = await States.find({});
    res.json(states);
  } catch (err) {
    console.log(err);
  }
});

app.post('/', async (req, res) => {
  const newState = new States({
    name: req.body.name,
    zip: req.body.zip,
  });
  try {
    await newState.save();
    res.status(200).redirect('/');
  } catch (err) {
    res.status(400).redirect('/');
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await States.findByIdAndDelete({ _id: id });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.listen(3000, () => {
  console.log('The server is running on port 3000');
});

