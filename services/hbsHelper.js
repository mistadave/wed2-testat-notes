function renderStars(context, options) {
    var ret = "";
    for (var i = 1; i <= parseInt(context); i++) {
        ret = ret + "&#9733; ";
    }
    return ret;
}

function renderImportance(context, options) {
    var ret = "";
    for (var i = 1; i <= 5; i++) {
        var option = "<option ";
        if (parseInt(context) === i) {
            option = option + "selected >";
        } else {
            option = option + ">";
        }
        option = option + i + "<//option>";
        ret = ret + option;
    }
    return ret;
}


module.exports = {getStars: renderStars, importance: renderImportance};