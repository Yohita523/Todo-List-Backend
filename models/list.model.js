const pool = require("../config/db");

async function getAll() {
  const [rows] = await pool.query(
    "SELECT id, name, created_at FROM lists ORDER BY id DESC"
  );
  return rows;
}

async function create(name) {
  const [result] = await pool.query(
    "INSERT INTO lists (name, created_at) VALUES (?, NOW())",
    [name]
  );

  const [rows] = await pool.query(
    "SELECT id, name, created_at FROM lists WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
}
async function update(id, name) {
  await pool.query("UPDATE lists SET name = ? WHERE id = ?", [name, id]);

  const [rows] = await pool.query(
    "SELECT id, name, created_at FROM lists WHERE id = ?",
    [id]
  );

  return rows[0];
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM lists WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};