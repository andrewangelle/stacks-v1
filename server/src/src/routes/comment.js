const express = require('express');
const handleRequest = require('../utils/helpers');

let comment = express.Router();
let db = require('../middleware/comment');

comment.get('/view/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getCommentsByParentId(req.params.id);

    await res.send(results).json();
    await res.end();
  }
  catch(next) {
    next
  }
}));

comment.post('/create', handleRequest(async (req, res, next) => {
  try {
    const results = await db.createNewComment(req.body);

    await res.send(results).json();
    await res.end();
  }
  catch(next) {
    next
  }
}));

comment.post('/reply', handleRequest(async (req, res, next) => {
  try{
    const results = await db.createNewReply(req.body);

    await res.send(results).json();
    await res.end();
  }
  catch(next) {
    next
  }
}));

comment.delete('/delete/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.deleteComment(req.params.id);

    await res.send(results).json();
    await res.end();
  }
  catch(next) {
    next
  }
}));

module.exports = comment

