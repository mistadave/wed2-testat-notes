function sortNotes(req, res, next) {
    var sortAlgo;
    var sortOrder;
    if(!req.session.sortOrder) {
        sortOrder = 1;
        req.session.sortOrder = sortOrder;
    } else {
        sortOrder = req.session.sortOrder;
    }
    if(req.params.name === req.session.sort) {
        sortOrder = req.session.sortOrder === 1 ? -1 : 1;
        req.session.sortOrder = sortOrder;
    } else if(req.params.name  === "/sortNotes/dueToDate" || req.params.name === "/sortNotes/addDate" || req.params.name === "/sortNotes/importance" || req.params.name === "/sortNotes/done") {
        req.session.sortOrder = 1;
    }
    if(req.params.name) {
        sortAlgo = req.params.name;
        req.session.sort = sortAlgo;
    }
     else if(req.session.sort) {
            sortAlgo = req.session.sort;
    } else {
        sortAlgo = "_id";
        req.session.sort = sortAlgo;
    }
    switch(sortAlgo) {
        case 'dueToDate':
            req.session.sort = 'dueToDate';
            break;
        case 'addDate':
            req.session.sort = 'addDate';
            break;
        case 'importance':
            req.session.sort = 'importance';
            break;
        case 'done':
            req.session.sort = 'done';
            break;
        default:
            req.session.sort = '_id';
    }
    next();
}

module.exports = {sortNotes: sortNotes};