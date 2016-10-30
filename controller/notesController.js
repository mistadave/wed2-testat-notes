var notesDAO = require("../services/notesDAO.js");

module.exports.showIndex = function(req, res) {
    res.render("index");
};

module.exports.newNote = function(req, res) {
    res.render("newNote");
};