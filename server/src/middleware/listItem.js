const queryDb = require('../utils/db');

let listItems = module.exports = {};

listItems.getItemsByParentId = async function(id) {
  const query = `select * from list_items where parent = '${id}'`;
  const results = await queryDb(query)

  return results
}

listItems.createNewItem = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`)
  const query = `insert into list_items(id,data,completed,parent,author) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}

listItems.deleteItem = async function(id) {
  const query = `delete from list_items where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}

listItems.updateItem = async function(id) {
  const query = `update list_items set completed = not completed where id = '${id}' returning id`;
  const results = await queryDb(query)

  return results
}
