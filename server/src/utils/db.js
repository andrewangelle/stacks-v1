const { Pool } = require ('pg');
const pool = new Pool(
  { connectionString: process.env.DATABASE_URL }
);

async function queryDb(str) {
  const client = await pool.connect()
  try {
    const results = await client.query(str);
    const data = await results.rows;

    return await data
  }
  finally {
    client.release()
  }
}

module.exports = queryDb





