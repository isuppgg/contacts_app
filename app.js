require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(require('./routes/router'));

// Starting the server
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
