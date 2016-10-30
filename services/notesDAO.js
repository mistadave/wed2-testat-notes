var Datastore = require('nedb');
var db = new Datastore({ filename: '../data/notes.db', autoload: true });

function Note(title, description, importance, dueToDate) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.addDate = JSON.stringify(new Date());
    this.dueToDate = dueToDate;
    this.done = false;
}

function publicAddNote(title, description, importance, dueToDate, callback) {
    var note = new Note(title, description, importance, dueToDate);
    db.insert(note, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function publicSetDone(id, callback) {
    db.update({_id: id}, {$set: {"done": true}}, {}, function (err, doc) {
        publicGet(id, callback);
    });
}

function publicDelete(id, callback) {
    db.remove({_id: id}, {}, function (err, doc) {
        if(callback) {
            callback(err, doc);
        }
    });
}

function publicGet(id, callback) {
    db.findOne({_id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function publicAll(callback) {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {add: publicAddNote, stateDone: publicSetDone, delete: publicDelete, get: publicGet, all: publicAll};