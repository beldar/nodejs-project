'use strict';

const express = require('express'),
      router  = express.Router();


module.exports = () => {

  router.get('/', (req, res, next) => {
    res.render('index', {message: 'Hello World'});
  });

  return router;
};
