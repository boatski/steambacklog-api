'use strict';
var api = require('./api/api');
var config = require('./config/config');

// koa
var koa = require('koa');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var json = require('koa-json');
var path = require('path');
var cors = require('kcors');
var app = module.exports = koa();

//mongoose
var mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.connection.on("error", function(err) {
  console.log('MongoDB Error: ', err);
});

// Logger
app.use(logger());

app.use(json({ pretty: false, param: 'pretty' }));

app.use(route.get('/', api.home));

app.use(cors());
app.use(route.get('/resolve/:url', api.resolve));
app.use(route.get('/summary/:id', api.summary));
app.use(route.get('/games/:id', api.games));


app.use(route.options('/', api.options));
app.use(route.trace('/', api.trace));
app.use(route.head('/', api.head));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3001);
  console.log('listening on port 3000');
}
