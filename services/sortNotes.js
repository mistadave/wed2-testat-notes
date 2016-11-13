function sortNotes(req, res, next) {
    console.log("session: " + req.session);
    if(!req.session.sort && !req.params.name) {
        console.log("_id");
        req.session.sort = "_id";
    } else {
        switch(req.params.name) {
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
                console.log("_id");
                req.session.sort = '_id';
        }
    }
    console.log("req.session.sort: " + req.session.sort);
    next();
}

module.exports = {sortNotes: sortNotes};