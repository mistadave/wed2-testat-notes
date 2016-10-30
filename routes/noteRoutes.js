var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.get("/", notes.showIndex);
router.get("/changeStyle", notes.changeStyle);
router.get("/newNote", notes.showNewNote);
router.get("/notes", notes.getNotes); //get all the notes
router.get("/notes/:id/", notes.getNote); //get one note by id
// TODO: POST: sent as JSON object in body works! Tested with POSTMAN.
router.post("/notes", notes.createNote); //insert new note
router.delete("/notes/:id/", notes.deleteNote); //delete a note by id


/*
// sorting routes
// for this we need handlebars helper to sort i guess...
 */
router.get('/showByFinishDate', notes.showByFinishDate);
router.get('/showByCreatedDate', notes.showByCreatedDate);
router.get('/showByImportance', notes.showByImportance);
router.get('/showFinished', notes.showFinished);


module.exports = router;
