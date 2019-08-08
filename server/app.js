'use strict';

/* import modules */
/* this is other comment, more comments */
/* more changes */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('./routes');
const path = require('path');
const rootPath = path.normalize(`${__dirname}/..`);
require('dotenv').config();

const app = express();

/* configure middleware */
app.set('appPath', path.join(rootPath, 'client'));
app.use(express.static('./client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

/* setup routing */
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
});

/* export app */
module.exports = app;
