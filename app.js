var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var json = require('express-json');
var hbs = require('express-hbs');
var session = require('express-session');
var routes = require('./routes/noteRoutes');
var hbsHelper = require('./services/hbsHelper');

var app = express();
var fp = require('path');

function relative(path) {
    return fp.join(__dirname, path);
}

var viewsDir = relative('views');

app.use(express.static(relative('public')));
// view engine setup
hbs.registerHelper('stars', hbsHelper.getStars);
hbs.registerHelper('dropimportance', hbsHelper.importance);
hbs.registerHelper('renderStyle', hbsHelper.renderStyle);
app.engine('hbs', hbs.express4({
    defaultLayout: relative('views/layouts/default.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', viewsDir);


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(json());
app.use(session({
    secret: 'de9429425c62fdffa4068d2758d3390c2a828531222797ba9fa641da1dce0055',
    resave: false,
    saveUninitialized: true
}));

// posibility to work wit app.put, app.delete etc. - very REST conform ^^
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(require('./routes/noteRoutes.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;