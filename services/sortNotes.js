function sortNotes(req, res, next) {
    var sort;
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
    }
    if(req.params.name) {
        sort = req.params.name;
        req.session.sort = sort;
    }
     else if(req.session.sort) {
            sort = req.session.sort;
    } else {
        sort = "_id";
        req.session.sort = sort;
    }
    switch(sort) {
        case 'dueToDate':
            req.session.sort = 'dueToDate';
            break;
        case 'addDate':
            req.session.sort = 'addDate';
            break;
        case 'importance':
            req.session.sort = 'importance';
            break;
        default:
            req.session.sort = '_id';
    }
    next();
}

module.exports = {sortNotes: sortNotes};