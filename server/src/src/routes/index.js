const express = require('express');
const path = require('path');
const handleRequest = require('../utils/helpers');
const queryDb  = require('../utils/db');

let indexRoute = express.Router();

// viewed at http://localhost:8080
indexRoute.get('/', handleRequest(async (req, res, next) => {
  const msg = {message: 'Stacks API up and running'}

  await res.send(msg).json();
  await res.end()
}));

module.exports = indexRoute