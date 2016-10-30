var notesDAO = require("../services/notesDAO.js");

var styleChanger = false;
var css = "style1.css";

module.exports.changeStyle = function(req, res) {
    styleChanger = !styleChanger;
    css = styleChanger ? "style2.css" : "style1.css";
    res.render("index", {style: css});
};

module.exports.showIndex = function(req, res) {
    res.render("index", {style: css});
};

module.exports.showNewNote = function(req, res) {
    res.render("showNewNote", {style: css});
};

module.exports.getNotes = function(req, res) {
        var notes = notesDAO.all(function(err, notes) {
            console.log(notes);
            res.render("index", notes);
        });
};

// TODO: alles auf gleiche showNewNote rendern sinnvoll?

module.exports.getNote = function(req, res) {
    var note = notesDAO.get(req.params.id, function(err, note) {
        console.log(note);
        res.render("showNewNote", note);
    });
};

module.exports.createNote = function(req, res) {
    console.log(req.body);
    console.log(req.params);
    var note = notesDAO.add(req.body.title, req.body.description, req.body.importance, req.body.dueToDate, function(err, note) {
        console.log("NOTE in createNote:");
        console.log(note);
        // TODO: Add {style: css} to note JSON and we are set with the style problem
       res.render("showNewNote", note);
    });
};

module.exports.deleteNote = function(req, res) {
    console.log(req.params);
    var note = notesDAO.delete(req.params.id, function(err, note) {
        console.log(note);
        // TODO: Add {style: css} to note JSON and we are set with the style problem
        res.render("showNewNote", note);
    });
};