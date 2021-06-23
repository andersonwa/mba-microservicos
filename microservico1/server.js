const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger_output.json')
const routes = require('./routes/index');
const dotenv = require('dotenv');
const Sentry = require("@sentry/node");

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app;