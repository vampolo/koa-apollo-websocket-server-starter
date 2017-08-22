const jwt = require('koa-jwt');
const { koaJwtSecret } = require('jwks-rsa');
const ms = require('ms');

function getJwt() {
  const secret = koaJwtSecret({
    jwksUri: 'https://DOMAIN.auth0.com/.well-known/jwks.json',
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: ms('10h') });

  const jwtClient = jwt({
    debug: true,
    secret: secret,
    audience: 'FILLME',
    issuer: 'FILLME'
  });

  return jwtClient;
}

module.exports = { getJwt }
