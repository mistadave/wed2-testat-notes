function changeStyle(req, res) {
    if(!req.session.style) {
        req.session.style = "default.css";
    } else {
        switch(req.session.style) {
            case 'default.css':
                req.session.style = 'style2.css';
                break;
            case 'style2.css':
                req.session.style = 'default.css';
                break;
            default:
                req.session.style = 'default.css';
        }
    }
    res.redirect("/");
}

function getStyle(req, res) {
    if (!req.session.style) {
        req.session.style = "default.css";
    }
    return req.session.style;
}

module.exports = {changeStyle: changeStyle, getStyle: getStyle};
