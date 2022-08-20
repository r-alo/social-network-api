const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const app        = express();
const port       = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

mongoose
  .connect(
    'mongodb://mongo:27017/social-network-api',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.listen(port, () => console.log('Server running...'));