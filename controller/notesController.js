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
    console.log("getNotes: " + req.session.sort);
    notesDAO.all(req.session.sort, req.session.sortOrder, function (err, notes) {
            console.log(notes);
        res.render("index", {
            title: "My notes",
            style: style.getStyle(req, res),
            notes: notes
        });
    });
};

module.exports.getNote = function(req, res) {
    notesDAO.get(req.params.id, function (err, note) {
        console.log("editNote: " + note);
        res.render("editNote", {
            title: "editNote " + note.title,
            style: style.getStyle(req, res),
            note: note
        });
    });
};

module.exports.createNote = function (req, res, next) {
    console.log(req.body);
    console.log(req.params);
    notesDAO.add(req.body.title, req.body.description, req.body.importance, req.body.dueToDate, req.body.done, function (err, note) {
        next();
    });
};

module.exports.updateNote = function (req, res) {
    console.log("update test");
    notesDAO.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueToDate, req.body.done, function (err, note) {
        console.log("updateNote: " + note);
        res.redirect("/");
    });
};

module.exports.deleteNote = function(req, res) {
    console.log(req.params);
    notesDAO.delete(req.params.id, function(err, note) {
        res.render("showNewNote", {
            note: note,
            style: req.session.style});
    });
};

module.exports.sortedNotes = function(req, res) {
    console.log("sortedNotes sort: " + req.session.sort);
    notesDAO.all(req.session.sort, req.session.sortOrder, function(err, notes) {
        res.render("index", {
            style: style.getStyle(req, res),
            notes: notes
        });
    });
};