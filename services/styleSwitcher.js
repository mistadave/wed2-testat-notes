function changeStyle(req, res) {
    var style = req.body.style;
    console.log("style submited: " + style);
    console.log("style in session: " + req.session.style);
    switch (style) {
        case 'hackey':
            req.session.style = 'hackey.css';
            break;
        case 'girlie':
            req.session.style = 'girlie.css';
            break;
        default:
            req.session.style = '';
    }

    res.redirect("/");
}

function getStyle(req, res) {
    if (!req.session.style) {
        req.session.style = "";
    }
    return req.session.style;
}

module.exports = {changeStyle: changeStyle, getStyle: getStyle};
