const express = require('express');
const  handleRequest = require('../utils/helpers');

let activity = express.Router()
let db = require('../middleware/activity');

activity.get('/view/:id', handleRequest(async (req, res, next) => {
  try {
    const results = await db.getActivityByParentId(req.params.id);

    await res.send(results).json();
    await res.end();
  }
  catch(next) {
    next
  }
}));

activity.post('/create', handleRequest(async (req, res) => {
  try {
    const results = await db.createNewActivity(req.body);

    await res.send(results).json();
    await res.end()
  }
  catch(next) {
    next
  }
}));

activity.delete('/delete/:id', handleRequest(async (req, res) => {
  try {
    const results = await db.deleteActivity(req.params.id);

    await res.send(results).json()
    await res.end();
  }
  catch(next) {
    next
  }
}));

module.exports = activity




