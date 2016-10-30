var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');

router.get('/', notes.showIndex);
router.get('/writeNote', notes.newNote);

module.exports = router;
