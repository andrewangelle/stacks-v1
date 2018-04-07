const express = require('express');
const handleRequest = require('../utils/helpers');

let listItem = express.Router()
let db = require('../middleware/listItem');

listItem.get('/view/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getItemsByParentId(req.params.id)

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

listItem.post('/create', handleRequest(async (req, res, next) => {
  try {
    const results = await db.createNewItem(req.body);

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

listItem.put('/put/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.updateItem(req.params.id)

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

listItem.delete('/delete/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.deleteItem(req.params.id)

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

module.exports = listItem

