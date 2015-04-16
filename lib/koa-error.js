/////////////////////////////////////////////////////////////////////////
//
// Constants
//
/////////////////////////////////////////////////////////////////////////

const DEF_NAME    = 'Generic Error';
const DEF_STATUS  = 400;
const DEF_DETAILS = null;

const CRTI_NAME   = 'Internal Server Error';
const CRIT_STATUS = 500;

/////////////////////////////////////////////////////////////////////////
//
// Custom Koa Error
//
/////////////////////////////////////////////////////////////////////////

// Constructor
//
function KError (seed, status, details) {
  let result = {};
  seed = seed || {};

  // if the seed is not an object
  if (typeof seed === 'string') {
    seed = {
      name    : seed,
      status  : status,
      details : details
    };
  }

  // allow use of new
  if (this) {
    this.name = seed.name || DEF_NAME;
    this.status  = seed.status || DEF_STATUS;
    this.details = seed.details || DEF_DETAILS;
    result = this;

  // otherwise return an simple object
  } else {
    result = {
      name    : seed.name || DEF_NAME,
      status  : seed.status || DEF_STATUS,
      details : seed.details || DEF_DETAILS
    };
  }

  if (!(process.env.NODE_ENV === 'prod' && process.env.NODE_ENV === 'production')) {
    console.warn(KError.toString(result, 1));
  }

  return result;
}

// Not Authorized - 401
//
KError.notAuth = function () {
  return new KError({
    name : 'Not Authorized',
    status  : 401
  });
}

// Not Found - 404
//
KError.notFound = function () {
  return new KError({
    name : 'Not Found',
    status  : 404
  });
}


/////////////////////////////////////////////////////////////////////////
//
// Utilities
//
/////////////////////////////////////////////////////////////////////////


// Send Error
//
KError.sendError = function *(ctx, err) {
  err = err || new KError();

  // if its a non KError, or a KError of status 500, emit and send it
  if (err instanceof Error || err.status == CRIT_STATUS) {
    err.name    = CRTI_NAME;
    err.details = DEF_DETAILS;
  }

  // set up the response
  ctx.response.status = err.status || CRIT_STATUS;
  ctx.body = {
    name    : err.name || CRTI_NAME,
    details : err.details || DEF_DETAILS
  };
}

// Handler Middleware
//
KError.handler = function *(next) {
  try {
    yield next;
  } catch (err) {
    yield KError.sendError(this, err);
  }
}

// To String
//
KError.toString = function (KErr, unwind) {
  let stack = (new Error()).stack;

  stack = stack.replace(/^[^\(]+?[\n$]/gm, '');
  stack = stack.replace(/^\s+at\s+/gm, '');
  stack = stack.split('\n');

  stack.shift();

  if (unwind) {
    for (let i = 0; i < unwind; i++) {
      stack.shift();
    }
  }

  stack.unshift('KError: ' + KErr.name);

  return stack.join('\n    ');
}

/////////////////////////////////////////////////////////////////////////
//
// Export
//
/////////////////////////////////////////////////////////////////////////


module.exports = KError;