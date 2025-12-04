const express = require("express");
const router = express.Router();
const listCtrl = require("../controllers/list.controller");

router.get("/", listCtrl.getLists);
router.post("/", listCtrl.createList);
router.put("/:id", listCtrl.updateList);
router.delete("/:id", listCtrl.deleteList);

module.exports = router;
