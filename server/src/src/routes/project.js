const express = require('express');
const handleRequest = require('../utils/helpers');

let project = express.Router()
let db = require('../middleware/project')

project.get('/view/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getProjectByUser(req.params.id);

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

project.post('/create', handleRequest(async (req, res, next) => {
  try {
    const results= await db.createProject(req.body)

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

project.delete('/delete/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.deleteProject(req.params.id);

    await res.send(results).json()
    await res.end()
  }
  catch(next) {
    next
  }
}));

module.exports = project