var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
var style = require('../services/styleSwitcher');
var sort = require('../services/sortNotes.js');
router.get("/", sort.sortNotes, notes.getNotes);
router.post("/changeStyle", style.changeStyle);
router.get("/notes/new", notes.showNewNote);
router.get("/notes", notes.getNotes);
router.get("/notes/:id", notes.getNote);
router.post("/notes/create", notes.createNote);
router.post("/notes/edit/:id", notes.updateNote);
router.get('/sortNotes/:name', sort.sortNotes, notes.sortedNotes);

module.exports = router;
