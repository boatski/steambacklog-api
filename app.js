'use strict';
var steambacklog = require('./controllers/steambacklog');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', steambacklog.home));
app.use(route.get('/summary/:id', steambacklog.summary));
app.use(route.options('/', steambacklog.options));
app.use(route.trace('/', steambacklog.trace));
app.use(route.head('/', steambacklog.head));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
