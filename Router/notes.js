const express = require("express");
const router = express.Router();
const notesController = require("../Controller/notes");

router.get("/getNotes", notesController.getNotes);

router.post("/createNotes", notesController.createNotes);

router.put("/updateNotes/:id", notesController.updateNotes);

router.delete("/deleteNotes/:id", notesController.deleteNotes);

module.exports = router;
