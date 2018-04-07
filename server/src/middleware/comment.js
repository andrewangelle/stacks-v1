const queryDb = require('../utils/db');

let comment = module.exports = {};

comment.getCommentsByParentId = async function(id) {
  const query = `select * from comments where parent = '${id}'`;
  const results = await queryDb(query)

  return results
}

comment.createNewComment = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`)
  const query = `insert into comments(id,data,parent,author,created,isReply) values(${values}) returning *`;
  const results = await queryDb(query)

  return results
}

comment.createNewReply = async function(obj) {
  const values = Object.values(obj).map(value => `'${value}'`)
  const query = `insert into comments(id,data,parent,author,isReply,originId,created) values(${values}) returning *`;
  const results = await queryDb(query);

  return results
}

comment.deleteComment = async function(id) {
  const query = `delete from comments where id = '${id}' returning *`;
  const results = await queryDb(query)

  return results
}