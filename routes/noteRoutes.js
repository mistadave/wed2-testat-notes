var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
var style = require('../services/styleSwitcher');
var sort = require('../services/sortNotes.js');
router.get("/", sort.sortNotes, notes.getNotes);
router.get("/changeStyle", style.changeStyle);
router.get("/notes/new", notes.showNewNote);
router.get("/notes", notes.getNotes); //get all the notes
router.get("/notes/:id", notes.getNote); //get one note by id
// TODO: POST: sent as JSON object in body works! Tested with POSTMAN.
router.post("/notes/create", notes.createNote, notes.getNotes); //insert new note
router.post("/notes/edit/:id", notes.updateNote); //update note by id
router.delete("/notes/:id", notes.deleteNote); //delete a note by id


/*
// sorting routes
// for this we need handlebars helper to sort i guess...
 */
/*
router.get('/showByFinishDate', notes.showByFinishDate);
router.get('/showByCreatedDate', notes.showByCreatedDate);
router.get('/showByImportance', notes.showByImportance);
router.get('/showFinished', notes.showFinished);
*/
router.get('/sortNotes/:name', sort.sortNotes, notes.sortedNotes);

module.exports = router;
