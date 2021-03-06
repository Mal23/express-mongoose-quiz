const express = require('express');
const app = express();
const mongoConnection = require('./middleware/mongo-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

app.use('/api/v1/colors', mongoConnection, require('./routes/colors'));
app.use('/colors', require('./routes/colors'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

app.get('/', (req, res) => {
  res.end('Connected, no response');
});

module.exports = app;
