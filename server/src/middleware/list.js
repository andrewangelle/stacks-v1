const queryDb = require('../utils/db');

let list = module.exports = {};

list.getListsByParentId = async function(id) {
  const query = `select * from lists where parent = '${id}'`;
  const results = await queryDb(query)

  return results
}

list.createNewList = async function(obj){
  const values = Object.values(obj).map(value => `'${value}'`)
  const query = `insert into lists(id,name,parent,author) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}

list.deleteList = async function(id) {
  const query = `delete from lists where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}