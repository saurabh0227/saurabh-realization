const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const apiV1 = require('./apiV1/index');

class App {
  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.handleError();
  }

  setMiddlewares() {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  setRoutes() {
    this.express.use('/v1', apiV1);
  }

  handleError() {
    this.express.use((err, req, res, next) => {
      if (!err) {
        return next();
      }
      res.status(500).send({
        status: false,
        success: null,
        error: {
          message: 'Something went wrong!',
        },
      });
    });
  }
}

module.exports = new App().express;
