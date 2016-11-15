function sortNotes(req, res, next) {
    console.log("session: " + req.session);
    console.log("req.session.sort: " + req.session.sort);
    var sortAlgo;
    if(req.params.name) {
        console.log("if req.params.name");
        sortAlgo = req.params.name;
        req.session.sort = sortAlgo;
    }
     else if(req.session.sort) {
            console.log("if req.session.sort");
            sortAlgo = req.session.sort;
    } else {
        console.log("default _id");
        sortAlgo = "_id";
        req.session.sort = sortAlgo;
    }
    switch(sortAlgo) {
        case 'dueToDate':
            console.log("dueToDate");
            req.session.sort = 'dueToDate';
            break;
        case 'addDate':
            console.log("createdDate");
            req.session.sort = 'createdDate';
            break;
        case 'importance':
            console.log("importance");
            req.session.sort = 'importance';
            break;
        case 'done':
            console.log("done");
            req.session.sort = 'done';
            break;
        default:
            console.log("default _id");
            req.session.sort = '_id';
    }
    next();
}

module.exports = {sortNotes: sortNotes};