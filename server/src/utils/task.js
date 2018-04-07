const fetch = require('node-fetch');

//arbitrary task that runs every 10 minutes on heroku scheduler to keep dyno live
(async function Task() {
  const results = await fetch('https://stacks-app.herokuapp.com/api');
  return await results
})();