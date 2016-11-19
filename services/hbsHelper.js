function renderStars(context, options) {
    var ret = "";
    for (var i = 1; i <= parseInt(context); i++) {
        ret = ret + "&#9733; ";
    }
    return ret;
}

function renderImportance(context, options) {
    "use strict";
    var ret = "";
    for (var i = 1; i <= 5; i++) {
        var option = "<option ";
        if (parseInt(context) === i) {
            option = option + "selected >";
        } else {
            option = option + ">";
        }
        option = option + i + "</option>";
        ret = ret + option;
    }
    return ret;
}

function renderStyle(context, options) {
    "use strict";
    var css = ["default", "hackey", "girlie"];
    var ret = "";

    for (var i = 0; i < css.length; i++) {
        var option = "<option value='" + css[i] + "' ";
        if (context.slice(0, -4) === css[i]) {
            option = option + "selected >";
        } else {
            option = option + ">";
        }
        option = option + css[i] + "</option>";
        ret = ret + option
    }
    return ret;
}


module.exports = {getStars: renderStars, importance: renderImportance, renderStyle: renderStyle};