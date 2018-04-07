const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

//Routes Modules
const indexRoute = require('./routes/index');
const user = require('./routes/user');
const project = require('./routes/project');
const stack = require('./routes/stack');
const card = require('./routes/card');
const list = require('./routes/list');
const listItem = require('./routes/listItem');
const comment = require('./routes/comment');
const activity = require('./routes/activity');

const app = express();

dotenv.load()

//Environment Variables
const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 8080
//Http Middleware
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Serve Static
app.use(express.static(path.format({
  root: '/app/client/build/static'
})));

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes Middleware
app.use('/api', indexRoute);
app.use('/api/user', user);
app.use('/api/project', project);
app.use('/api/stack', stack)
app.use('/api/card', card)
app.use('/api/list', list)
app.use('/api/item', listItem)
app.use('/api/comment', comment)
app.use('/api/activity', activity)

/**
  If no other routes match a GET req,
  serve the page back
*/
app.get('*', (req,res) => {
  res.sendFile(path.format({
    root: '/app/client/build/',
    base: 'index.html'
  }))
})


module.exports = app