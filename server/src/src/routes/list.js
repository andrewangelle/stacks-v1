const express = require('express');
const handleRequest = require('../utils/helpers');

let list = express.Router();
let db = require('../middleware/list');

list.get('/view/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getListsByParentId(req.params.id)

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

list.post('/create', handleRequest(async (req, res, next) => {
  try {
    const results = await db.createNewList(req.body)

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

list.delete('/delete/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.deleteList(req.params.id);

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

module.exports = list
