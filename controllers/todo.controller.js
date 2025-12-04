const Todo = require("../models/todo.model");

async function getTodos(req, res) {
  try {
    const listId = req.query.list_id || null;
    const todos = await Todo.getAll(listId);
    res.json(todos);
  } catch (err) {
    console.error("getTodos error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

async function createTodo(req, res) {
  try {
    const { title, list_id, details, due_at } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "title is required" });
    }

    const todo = await Todo.create({
      title: title.trim(),
      list_id: list_id ?? null,
      details: details ?? null,
      due_at: due_at ?? null,
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("createTodo error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

async function updateTodo(req, res) {
  try {
    const id = req.params.id;
    const { title, list_id, details, due_at, is_done } = req.body;

    const fields = {
      title,
      list_id,
      details,
      due_at,
    };

    if (is_done !== undefined) {
      fields.is_done = !!is_done;
    }

    const updated = await Todo.update(id, fields);

    if (!updated) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateTodo error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    const ok = await Todo.remove(id);

    if (!ok) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("deleteTodo error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
