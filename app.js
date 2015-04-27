let koa     = require('koa');
let compose = require('koa-compose');
let colors  = require('colors');
let KError = require('./lib/koa-error');
let route  = require('./route');

let app  = koa();
let port = 3000;

// Log out requests
app.use(function *(next) {
  console.log('  ' + (this.request.method).green + ' ' + (this.request.path).gray);
  yield next;
});

// Error Handler
app.use(KError.handler);

// Apply routes
route(app);

app.listen(port);
console.log('\nlistening on port ' + port + '...\n');
