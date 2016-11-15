function changeStyle(req, res) {
    console.log("session: " + req.session);
    if(!req.session.style) {
        console.log("no css set yet");
        req.session.style = "default.css";
    } else {
        console.log("change css");
        switch(req.session.style) {
            case 'default.css':
                console.log("stylechange: is style defautl");
                req.session.style = 'style2.css';
                break;
            case 'style2.css':
                console.log("stylechange: is style style2");
                req.session.style = 'default.css';
                break;
            default:
                req.session.style = 'default.css';
        }
    }
    console.log("req.session.style: " + req.session.style);
    res.redirect("/");
}

function getStyle(req, res) {
    if (!req.session.style) {
        req.session.style = "default.css";
    }
    return req.session.style;
}

module.exports = {changeStyle: changeStyle, getStyle: getStyle};
