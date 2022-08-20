const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const Database   = require('./config/database');
const CONFIG     = require('./config/config');
const routes = require('./routes');
const app        = express();
const port       = 3000;

Database.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(routes);

app.listen(CONFIG.PORT, () => console.log('Server running...'));