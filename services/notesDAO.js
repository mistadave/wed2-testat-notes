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

function publicAll(sorting, sortingOrder, callback) {
    // TODO: problem with string conversion sorting, does not work as variable passing
    console.log("publicAll sorting outside: " + sorting);
    console.log("typeof: " + typeof(sorting));
    if(sorting === "done") {
        if(sortingOrder === 1) {
            db.find({"done": true}).sort({}).exec(function(err,doc) {
                callback(err, doc);
            });
        } else if(sortingOrder === -1) {
            db.find({}).sort({}).exec(function(err,doc) {
                callback(err, doc);
            });
        }
    } else if(sorting === "dueToDate") {
        db.find({}).sort({"dueToDate": sortingOrder}).exec(function(err,doc) {
            callback(err,doc);
        });
    } else if(sorting === "addDate") {
        db.find({}).sort({"addDate": sortingOrder}).exec(function(err,doc) {
            callback(err,doc);
        });
    } else if(sorting === "importance") {
        db.find({}).sort({"importance": sortingOrder}).exec(function(err,doc) {
            callback(err,doc);
        });
    } else {
        db.find({}).sort({}).exec(function(err,doc) {
            callback(err,doc);
        });
    }

}

module.exports = {add: publicAddNote, stateDone: publicSetDone, delete: publicDelete, get: publicGet, update: publicUpdate, all: publicAll};