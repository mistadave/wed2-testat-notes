var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/notes.db', autoload: true });

function Note(title, description, importance, dueToDate, done) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.addDate = JSON.stringify(new Date());
    this.dueToDate = dueToDate;
    this.done = done;
}

function publicAddNote(title, description, importance, dueToDate, done, callback) {
    done = (typeof done !== 'undefined');
    var note = new Note(title, description, importance, dueToDate, done);
    db.insert(note, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function publicUpdate(id, title, description, importance, dueToDate, done, callback) {
    done = (done === 'on');
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "dueToDate": dueToDate, "done": done}}, {}, function(err, doc) {
        publicGet(id, callback);
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

function publicAll(filter, sorting, sortingOrder, callback) {
    var sortObject;
    var filterObject;
    switch(sorting) {
        case 'dueToDate':
            sortObject = {'dueToDate' : sortingOrder};
            break;
        case 'addDate':
            sortObject = {'addDate' : sortingOrder};
            break;
        case 'importance':
            sortObject = {'importance' : sortingOrder};
            break;
        default:
            sortObject = {};
    }
    if(filter) {
        filterObject = {"done" : filter};
    } else {
        filterObject = {};
    }
    db.find(filterObject).sort(sortObject).exec(function(err,doc) {
        callback(err,doc);
    });

}

module.exports = {add: publicAddNote, stateDone: publicSetDone, delete: publicDelete, get: publicGet, update: publicUpdate, all: publicAll};