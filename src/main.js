const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const schema = require('./schema');
const websockify = require('koa-websocket');

const app = new Koa();
const socket = websockify(app);
const http = new Router();
const ws = new Router();
const PORT = 3000;

http.get('/', async function(ctx, next) {
  ctx.status = 200;
  ctx.body = 'Hello!';
});

ws.all('/ws', async function(ctx, next) {
  console.log('connected websocket');
  ctx.websocket.send('Hey');
  ctx.websocket.on('message', async function(message) {
    console.log(message);
    ctx.websocket.send(message);
    });
});

app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

http.post('/graphql', KoaBody(), graphqlKoa({ schema: schema }));
http.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql'}));

// Redirect / to /graphiql
http.redirect('/', '/graphiql');

app.listen(PORT);

process.env.NODE_ENV != 'production' && console.log(`
  Server running on port ${PORT}
  GraphQL running on http://localhost:${PORT}/graphql
  GraphiQL running on http://localhost:${PORT}/graphiql
  WebSocket running on http://localhost:${PORT}/ws
`);
