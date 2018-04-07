const express = require('express');
const handleRequest = require('../utils/helpers');
let card = express.Router()
let db = require('../middleware/card');

card.get('/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getCardById(req.params.id)
    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

card.get('/view/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getCardsByParentId(req.params.id)
    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

card.post('/create', handleRequest(async (req, res, next) => {
  try {
    const results = await db.createNewCard(req.body)
    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

card.put('/update', handleRequest(async (req,res,next) => {
  try {
    const { description, id } = req.query
    const results =  await db.updateCardDescription(description, id)
    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

card.delete('/delete/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.deleteCard(req.params.id);
    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

module.exports = card




