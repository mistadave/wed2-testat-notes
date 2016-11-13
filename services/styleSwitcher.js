function changeStyle(req, res, next) {
    console.log("session: " + req.session);
    if(!req.session.style) {
        req.session.style = "style1.css";
    } else if(req.url == '/changeStyle') {
        switch(req.session.style) {
            case 'style1.css':
                req.session.style = 'style2.css';
                break;
            case 'style2.css':
                req.session.style = 'style1.css';
                break;
            default:
                req.session.style = 'style2.css';
        }
    }
    console.log("req.session.style: " + req.session.style);
    next();
}

module.exports = {changeStyle: changeStyle};
