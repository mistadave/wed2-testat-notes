function sortNotes(req, res, next) {
    console.log("session: " + req.session);
    //console.log(req);
    //req.session.style = req.session.style == 'style2.css' ? 'style1.css' : 'style2.css';
    if(!req.session.sort) {
        req.session.sort = "default";
    } else {
        switch(req.param['name']) {
            case 'finishDate':
                req.session.sort = 'finishDate';
                break;
            case 'createdDate':
                req.session.sort = 'createdDate';
                break;
            case 'importance':
                req.session.sort = 'importance';
                break;
            case 'finished':
                req.session.sort = 'finished';
                break;
            default:
                req.session.sort = 'default';
        }
    }
    console.log("req.session.sort: " + req.session.sort);
    next();
}

module.exports = {sortNotes: sortNotes};