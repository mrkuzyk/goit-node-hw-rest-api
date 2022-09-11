const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const moment = require('moment');
const fs = require('fs').promises;

require('dotenv').config();

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use(cors());

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

app.use(async (req, _, next) => {
  const { method, url } = req;
  const date = moment().format();
  await fs.appendFile('server.log', `\n${method} ${url} ${date} `);
  next();
});

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;

