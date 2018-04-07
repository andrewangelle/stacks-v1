const queryDb = require('../utils/db');

let project = module.exports = {}

project.getProjectByUser = async function(id) {
  const query = `select * from projects where author = '${id}'`;
  const results = await queryDb(query)

  return results
}

project.createProject = async function(body) {
  const values = Object.values(body).map(value => `'${value}'`)
  const query = `insert into projects(id,name,author) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}

project.deleteProject = async function(id) {
  const query = `delete from projects where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}

