
// Home
//
exports.home = function *() {
  this.body = {
    message : 'Hello World'
  };
}

// Echo
//
exports.echo = function *() {
  this.body = {
    message : this.request.query.say || 'add a `say` query param to echo the value'
  };
}

// Authenticated
//
exports.authenticated = function *(next) {
  this.body = {
    authenticated : 'true'
  };
}