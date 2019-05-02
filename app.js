const logger = require('rtve-module-logger').getLogger('rtve.tags.app'),
    properties = require('rtve-module-properties')(),
    common = require('rtve-module-common')('tags'),
    express = require('express'),
    path = require('path'),
    swig = require('swig'),
    swigLoader = require('rtve-module-swigloader'),
    app = express();

swig.setDefaults({
    loader: swigLoader(logger),
    cache: properties.swig_view_cache
});

var mainController = require('./routes/mainController');
var deportesController = require('./routes/deportesController');

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', properties.view_cache);

app.locals.pfPath = common.getPfPath(properties.pfPath);
app.locals.init_js = 'init_tags';
app.locals.body_class = 'p_final.tematic';

app.use(app.locals.pfPath + '/modulos/temas', mainController);
app.use(app.locals.pfPath + '/modulos/deportes', deportesController);

module.exports = app;
