'use strict';

const express = require('express'),
      router  = express.Router(),
      PR      = require('../../models/pr');


module.exports = () => {
  router
    .get('/', (req, res, next) => {
      //Get all PRs
      PR.find((err, prs) => {
        if (err) {
          res.status(500).json({error: err});
        } else {
          res.json(prs);
        }
      });
    })
    .post('/', (req, res, next) => {
      //Create new PR
      let pr = new PR(req.body.pr);

      pr.save((err) => {
        if (err) {
          res.status(500).json({error: err});
        } else {
          res.json({message: 'PR created!'});
        }
      });
    })
    .get('/:pr_id', (req, res, next) => {
      let pr_id = req.params.pr_id;

      console.log('id', pr_id);

      PR.findById(pr_id, (err, doc) => {
        if (err) {
          res.status(403).json({error: err});
        } else {
          res.json(doc);
        }
      })
    });

  return router;
};
