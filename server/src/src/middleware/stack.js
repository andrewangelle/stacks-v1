const queryDb = require('../utils/db');

let stack = module.exports = {}

stack.getStackByParentId = async function(id) {
  const query = `select * from stacks where parent = '${id}'`;
  const results = await queryDb(query)

  return results
}

stack.createNewStack = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`)
  const query = `insert into stacks(id,name,parent,author) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}

stack.deleteStack = async function(id) {
  const query = `delete from stacks where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}