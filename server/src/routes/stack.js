const express = require('express');
const handleRequest = require('../utils/helpers');
let stack = express.Router()
let db = require('../middleware/stack');

stack.get('/view/:id', handleRequest(async (req, res, next) => {
  try{
    const results = await db.getStackByParentId(req.params.id);

    await res.send(results).json();
    await res.end();
  }
  catch(next){
    next
  }
}));

stack.post('/create', handleRequest(async (req, res, next) => {
  try{
    const results = await db.createNewStack(req.body)

    await res.send(results).json()
    await res.end();
  }
  catch(next){
    next
  }
}));

stack.delete('/delete/:id', handleRequest(async (req, res, next) => {
  try{
    const results = await db.deleteStack(req.params.id);

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

module.exports = stack
