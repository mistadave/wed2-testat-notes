function filterNotes(req, res, next) {
    var filter;
    if(typeof req.params.name === 'undefined' && typeof req.session.filter === 'undefined') {
        filter = false;
        req.session.filter = filter;
    }
    if(req.params.name === 'done') {
        if(typeof req.session.filter !== 'undefined') {
            filter = req.session.filter !== true;
            req.session.filter = filter;
        } else {
            req.session.filter = true;
        }
    }
    next();
}

module.exports = {filterNotes: filterNotes};