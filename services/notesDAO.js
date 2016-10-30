/**
 * Created by David on 19.10.2016.
 */
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(title, description, importance, dueToDate, done) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueToDate = dueToDate;
    this.done = done;
}

function publicAddNote(title, description, importance, dueToDate) {
    var note = new Note(title, description, importance, dueToDate, false)
    db.insert(note, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function publicSetDone(id, callback) {
    db.update({_id: id}, {$set: {"state": true}}, {}, function (err, doc) {
        publicGet(id, callback);
    });
}

function publicDelete(id, callback) {
    db.delete({_id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback) {
    db.findOne({_id: id}, function (err, doc) {
        callback(err, doc);
    });
}

function publicAll() {
    db.find({}, function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {add: publicAddNote, stateDone: publicSetDone, delete: publicDelete, get: publicGet, all: publicAll};