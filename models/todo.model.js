const pool = require("../config/db");

function toMySQLDateTime(input) {
  if (!input) return null;
  const d = new Date(input);
  if (isNaN(d.getTime())) {
    return null;
  }

  const pad = (n) => n.toString().padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hour = pad(d.getHours());
  const min = pad(d.getMinutes());
  const sec = pad(d.getSeconds());

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

async function getAll(listId) {
  let sql = `
    SELECT id, list_id, title, details, is_done, due_at, created_at
    FROM todos
  `;
  const params = [];

  if (listId) {
    sql += " WHERE list_id = ?";
    params.push(listId);
  }

  sql += " ORDER BY created_at DESC";

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function create({
  title,
  list_id = null,
  details = null,
  due_at = null,
}) {
  const due = toMySQLDateTime(due_at);

  const [result] = await pool.query(
    `
    INSERT INTO todos (title, list_id, details, is_done, due_at, created_at)
    VALUES (?, ?, ?, 0, ?, NOW())
    `,
    [title, list_id, details, due]
  );

  const [rows] = await pool.query(
    `
    SELECT id, list_id, title, details, is_done, due_at, created_at
    FROM todos
    WHERE id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}

async function update(id, fields) {
  const setParts = [];
  const params = [];

  if (fields.title !== undefined) {
    setParts.push("title = ?");
    params.push(fields.title);
  }
  if (fields.details !== undefined) {
    setParts.push("details = ?");
    params.push(fields.details);
  }
  if (fields.is_done !== undefined) {
    setParts.push("is_done = ?");
    params.push(fields.is_done ? 1 : 0);
  }
  if (fields.due_at !== undefined) {
    setParts.push("due_at = ?");
    params.push(toMySQLDateTime(fields.due_at));
  }
  if (fields.list_id !== undefined) {
    setParts.push("list_id = ?");
    params.push(fields.list_id);
  }

  if (setParts.length === 0) {
    return null;
  }

  params.push(id);

  await pool.query(
    `UPDATE todos SET ${setParts.join(", ")} WHERE id = ?`,
    params
  );

  const [rows] = await pool.query(
    `
    SELECT id, list_id, title, details, is_done, due_at, created_at
    FROM todos
    WHERE id = ?
    `,
    [id]
  );

  return rows[0] || null;
}

async function remove(id) {
  const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};