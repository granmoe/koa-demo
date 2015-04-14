let koa   = require('koa');
let route = require('koa-route');
let colors = require('colors');

/////////////////////////////////////////////////////////////////////////
//
// Initialization
//
/////////////////////////////////////////////////////////////////////////

let app = koa();

app.use(function *(next) {
  // this => [
  //   'request', // koa request
  //   'response', // koa response
  //   'app', // app instance
  //   'req', // node req
  //   'res', // node res
  //   'onerror',
  //   'originalUrl',
  //   'cookies', // you guessed it
  //   'accept'
  // ]

  console.log('  ' + (this.request.method).green + ' ' + (this.request.path).gray);
  yield next;
});


/////////////////////////////////////////////////////////////////////////
//
// Middleware
//
/////////////////////////////////////////////////////////////////////////


let middleware = {
  isAuth : function *() {
    // ASYNC CODE GOES HERE
    return ~this.request.querystring.indexOf('_authenticated_');
  }
}


/////////////////////////////////////////////////////////////////////////
//
// Controllers
//
/////////////////////////////////////////////////////////////////////////


let controllers = {

  // Home
  //
  home : function *() {
    this.body = 'Hello World'
  },

  // Echo
  //
  echo : function *() {
    this.body = this.request.query.say || 'add a `say` query param to echo the value';
  },

  authenticated : function *() {
    var isAuth = yield middleware.isAuth; // blocking async call. WAT.
    this.body = isAuth ? 'YES' : 'NO';
  }
}




/////////////////////////////////////////////////////////////////////////
//
// Routes
//
/////////////////////////////////////////////////////////////////////////


// Home
//
app.use(route.get('/', controllers.home));


// Echo
//
app.use(route.get('/echo', controllers.echo));


// authenticated
//
app.use(route.get('/authenticated', controllers.authenticated));

/////////////////////////////////////////////////////////////////////////
//
// Finalize
//
/////////////////////////////////////////////////////////////////////////


let port = 3000;
app.listen(port);
console.log('\nlistening on port ' + port + '...\n'); // string templating isn't implemented in harmonay at the time of writing :(