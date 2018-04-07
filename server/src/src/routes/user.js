const express = require('express');
const handleRequest = require('../utils/helpers');

let user = express.Router();
let db = require('../middleware/user');

user.get('/check', handleRequest(async (req, res, next) => {
  try {
    const results = db.checkIfUserExists(req.query)

    await res.send(results).json()
    await res.end()
  }
  catch(next){
    next
  }
}));

user.post('/create', handleRequest(async (req, res, next) => {
  try{
    const results = db.createNewUser(req.body);

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

module.exports = user