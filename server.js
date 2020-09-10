// const mongoose = require('mongoose');
// const keys = require('./src/config');
// const app = require('./src');

import mongoose from 'mongoose';
import keys from './src/config/index.js';
import app from './src/index.js';

mongoose.connect(keys.mongoURI, () => {
  console.log('Connected to mongodb');
});

app.listen(keys.port, () => {
  console.log('Server listening on port', keys.port);
});
