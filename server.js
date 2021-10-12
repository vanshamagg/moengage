var express = require('express');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');

var URI = '';
mongoose.connect(URI)
  .then(c => console.error('connection made'))
  .error(e => console.log(e));

var userSchema = new mongoose.Schema({
  name: String,

  email: String,

  password: String

});

var User = mongoose.model('User', userSchema);

var app = express();

app.get(express.json({}));

app.post('signup', async (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var user = await User.create({ name, email, password });

  res.json({ user: user });

  next();
});


app.post('login', async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = await User.find({ email, password });

  if (user === undefined || user === null)
    throw new Error('Envaleed username orr passworrrd');

  res.json({ token: jsonwebtoken.sign({ email, password }, 'some random secret') });

  next();
});

app.listen(3000, () => console.log('APP STARTED ON PORT 3000'));