const mongoose = require('mongoose');
const keys = require('./src/config');
const app = require('./src');

mongoose.connect(keys.mongoURI, () => {
  console.log('Connected to mongodb');
});

app.listen(keys.port, () => {
  console.log('Server listening on port', keys.port);
});
