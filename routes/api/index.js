'use strict';

const express = require('express'),
      router  = express.Router(),
      pr      = require('./pr');


module.exports = () => {

  router.use('/pr', pr());

  return router;
};
