const queryDb = require('../utils/db');

let user = module.exports = {};

user.checkIfUserExists = async function(email) {
  const query = `select exists (select true from users where email = '${email}')`;
  const results = await queryDb(query)

  return results
}

user.createNewUser = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`);
  const query = `insert into users(id,name,email,uid) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}