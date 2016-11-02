/**
 * Created by David on 02.11.2016.
 */

function changeStyle(req, res, next) {
    console.log("session: " + req.session);
    if (req.session.style) {
        //TODO implement logic for style switch
    } else {
        req.session.style = 'layout/default';
    }
    //css = styleChanger ? "style2.css" : "style1.css";
    next();
}

module.exports = {changeStyle: changeStyle};
