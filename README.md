# koa-demo
A demo/sandbox for the koa framework


## To Run

ES6 is required for koa, so make sure a supporting version of node is installed

- `$ npm install -g n` (or any node version tool)
- `$ n 0.11.13` (at the time of writing)

Run the server with the `--harmony` flag to allow ES6 functionality

- `$ node --harmony --use-strict app`
  - OR `$ npm start` (requires `nodemon`)

## Dev tools

If using sublime, install [Java​Script​Next - ES6 Syntax](https://packagecontrol.io/packages/JavaScriptNext%20-%20ES6%20Syntax) and set it as the default JS highlighter

## Routes

`/` - hello world

`/echo` - echo's the query param `say`

`/authenticated` - prints `YES` or `NO` depending on whether or not `_authenticated_` is in the query string