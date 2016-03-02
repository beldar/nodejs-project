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
          return res.status(500).json({error: err});
        }

        res.json(prs);
      });
    })
    .post('/', (req, res, next) => {
      //Create new PR
      let pr = new PR(req.body.pr);

      pr.save((err) => {
        if (err) {
          return res.status(500).json({error: err});
        }

        res.status(201).json({message: 'PR created!'});
      });
    })
    .get('/:pr_id', (req, res, next) => {
      //Get a single PR
      let pr_id = req.params.pr_id;

      PR.findById(pr_id, (err, doc) => {
        if (err) {
          return res.status(500).json({error: err});
        }
        if (!doc){
          return res.status(404).json({error: 'PR not found'});
        }

        res.json(doc);
      });
    })
    .put('/:pr_id', (req, res, next) => {
      //Update a single PR
      let pr_id = req.params.pr_id;

      PR.findById(pr_id, (err, doc) => {
        if (err) {
          return res.status(500).json({error: err});
        }
        if (!doc){
          return res.status(404).json({error: 'PR not found'});
        }

        let updated = req.body.pr;
        Object.assign(doc, updated);

        doc.save((err) => {
          if (err) {
            return res.status(500).json({error: err});
          }

          res.json(doc);
        });
      })
    })
    .delete('/:pr_id', (req, res, next) => {
      //Delete a single PR
      let pr_id = req.params.pr_id;

      PR.findById(pr_id, (err, doc) => {
        if (err) {
          return res.status(500).json({error: err});
        }
        if (!doc){
          return res.status(404).json({error: 'PR not found'});
        }

        doc.remove((err) => {
          if (err) {
            return res.status(500).json({error: err});
          }

          res.json({message: 'PR removed correctly'});
        });
      });
    });

  return router;
};
