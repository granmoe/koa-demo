let KError = require('./koa-error');
let _      = require('lodash')

// Require Authentication
//
exports.requireAuth = function *(next) {
  if (~this.request.querystring.indexOf('_authenticated_')) {
    if (_.isFunction(next)) {
      yield next;
    } else {
      throw KError();
    }
  } else {
    throw KError.notAuth();
  }
};