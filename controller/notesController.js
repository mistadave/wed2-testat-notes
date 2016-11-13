var notesDAO = require("../services/notesDAO.js");

module.exports.showIndex = function(req, res) {
    res.render("index", {
        title: "My notes",
        style: req.session.style,
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
    notesDAO.all(req.session.sort, function (err, notes) {
            console.log(notes);
        res.render("index", {
            title: "My notes",
            style: req.session.style,
            notes: notes
        });
    });
};

module.exports.getNote = function(req, res) {
    notesDAO.get(req.params.id, function (err, note) {
        console.log("editNote: " + note);
        res.render("editNote", {
            title: "editNote " + note.title,
            style: req.session.style,
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
        res.render("editNote", {
            title: "editNote " + note.title,
            style: req.session.style,
            note: note
        });
    });
};

module.exports.deleteNote = function(req, res) {
    console.log(req.params);
    var note = notesDAO.delete(req.params.id, function(err, note) {
        res.render("showNewNote", {
            note: note,
            style: req.session.style});
    });
};

/*
 * sorting routes
 */
// TODO: sort as requested and send notes back
/*
module.exports.showByFinishDate = function(req, res) {
    var notes = notesDAO.all(function(err, notes) {
        notes['style'] = css;
        console.log(notes);
        res.render("index", notes);
    });
};

module.exports.showByCreatedDate = function(req, res) {
    var notes = notesDAO.all(function(err, notes) {
        notes['style'] = css;
        console.log(notes);
        res.render("index", notes);
    });
};

module.exports.showByImportance = function(req, res) {
    var notes = notesDAO.all(function(err, notes) {
        notes['style'] = css;
        console.log(notes);
        res.render("index", notes);
    });
};

module.exports.showFinished = function(req, res) {
    var notes = notesDAO.all(function(err, notes) {
        notes['style'] = css;
        console.log(notes);
        res.render("index", notes);
    });
};
*/

module.exports.sortedNotes = function(req, res) {
    // TODO: depending on req.session.sort, we need to sort and give sorted notes back
    console.log("sortedNotes sort: " + req.session.sort);
    var notes = notesDAO.all(req.session.sort, function(err, notes) {
        res.render("index", {
            style: req.session.style,
            notes: notes
        });
    });
};