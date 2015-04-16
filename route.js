let router     = require('koa-router');
let components = require('./components/controllers');
let middleware = require('./lib/middleware');

module.exports = function (app) {
  app.use(router(app));

  // Home
  //
  app.get('/', components.home);


  // Echo
  //
  app.get('/echo', components.echo);


  // authenticated
  //
  app.get('/authenticated', middleware.requireAuth, components.authenticated);

  app.get('/test', function *() {
    console.log('first')
    console.log(arguments)

  }, function () {
    console.log('second')
    console.log(arguments)
  });

}