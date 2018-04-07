const queryDb = require('../utils/db');

let card = module.exports = {};

card.getCardById = async function(id) {
  const query = `select * from cards where id = '${id}'`;
  const results = await queryDb(query)

  return results
}

card.getCardsByParentId = async function(id) {
  const query = `select * from cards where parent = '${id}'`;
  const results = await queryDb(query)

  return results
}

card.createNewCard = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`);
  const query = `insert into cards(id,name,parent,author) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}

card.deleteCard = async function(id) {
  const query = `delete from cards where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}

card.updateCardDescription = async function(str, id) {
  const query = `update cards set description = '${str}' where id = '${id}'`
  const results = await queryDb(query)

  return results
}