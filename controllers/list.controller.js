const List = require("../models/list.model");

async function getLists(req, res) {
  try {
    const lists = await List.getAll();
    res.json(lists);
  } catch (err) {
    console.error("getLists error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

async function createList(req, res) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "name is required" });
    }

    const list = await List.create(name.trim());
    res.status(201).json(list);
  } catch (err) {
    console.error("createList error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

async function updateList(req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "name is required" });
    }

    const updated = await List.update(id, name.trim());
    res.json(updated);
  } catch (err) {
    console.error("updateList error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

async function deleteList(req, res) {
  try {
    const id = req.params.id;
    const ok = await List.remove(id);
    if (!ok) {
      return res.status(404).json({ message: "list not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("deleteList error:", err);
    res.status(500).json({
      message: "DB error",
      detail: err.message,
    });
  }
}

module.exports = {
  getLists,
  createList,
  updateList,
  deleteList,
};
