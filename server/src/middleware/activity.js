const queryDb = require('../utils/db');

let activity = module.exports = {};

activity.getActivityByParentId = async function(id) {
  const query = `select * from activity where parent = '${id}'`;
  const results = await queryDb(query)

  return results
}

activity.createNewActivity = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`)
  const query = `insert into activity(id,type,message,parent,author,created) values(${values}) RETURNING *`;
  const results = await queryDb(query)

  return results
}

activity.deleteActivity = async function(id) {
  const query = `delete from activity where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}