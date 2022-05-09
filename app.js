require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes/router');
const errorHandler = require('./middlewares/handleErrors');

const morgan = require('morgan');

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  preflightContinue: false,
};

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(routes);
app.use(errorHandler);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
