var notesDAO = require("../services/notesDAO.js");

module.exports.showIndex = function(req, res) {
    res.render("index");
};

module.exports.showNewNote = function(req, res) {
    res.render("showNewNote");
};

module.exports.getNotes = function(req, res) {
        var notes = notesDAO.all(function(err, notes) {
            res.render("index", notes);
        });
};

// TODO: alles auf gleiche showNewNote rendern sinnvoll?

module.exports.getNote = function(req, res) {
    var note = notesDAO.get(req.params.id, function(err, note) {
        res.render("showNewNote", note);
    });
};

module.exports.createNote = function(req, res) {
    console.log(req.body);
    console.log(req.params);
    var note = notesDAO.add(req.body.title, req.body.description, req.body.importance, req.body.dueToDate, function(err, note) {
       res.render("showNewNote", note);
    });
};

module.exports.deleteNote = function(req, res) {
    console.log(req.params);
    var note = notesDAO.delete(req.params.id, function(err, note) {
        res.render("showNewNote", note);
    });
};