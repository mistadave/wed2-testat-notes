var notesDAO = require("../services/notesDAO.js");
var style = require("../services/styleSwitcher");

module.exports.showIndex = function(req, res) {
    res.render("index", {
        title: "My notes",
        style: style.getStyle(req, res),
        notes: null
    });
};

module.exports.showNewNote = function(req, res) {
    res.render("newNote", {
        title: "Create note",
        style: req.session.style
    });
};

module.exports.getNotes = function(req, res) {
    notesDAO.all(req.session.sort, req.session.sortOrder, function (err, notes) {
        res.render("index", {
            title: "My notes",
            style: style.getStyle(req, res),
            notes: notes,
            done: sessionDone(req)
        });
    });
};

function sessionDone(req) {
    "use strict";
    return (req.session.sortOrder === 1 && req.session.sort === 'done') ? true : false;
}

module.exports.getNote = function(req, res) {
    notesDAO.get(req.params.id, function (err, note) {
        res.render("editNote", {
            title: "editNote " + note.title,
            style: style.getStyle(req, res),
            note: note
        });
    });
};

module.exports.createNote = function (req, res) {
    notesDAO.add(req.body.title, req.body.description, req.body.importance, req.body.dueToDate, req.body.done, function (err, note) {
        res.redirect("/");
    });
};

module.exports.updateNote = function (req, res) {
    notesDAO.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueToDate, req.body.done, function (err, note) {
        res.redirect("/");
    });
};

module.exports.sortedNotes = function(req, res) {
    res.redirect("/");
};