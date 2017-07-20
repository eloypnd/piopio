var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');
var bunyan = require('bunyan');
var Twitter = require('./lib/twitter');

var log = bunyan.createLogger({name: 'pio-log'});

var twitter = new Twitter({
  key: process.env.TWITTER_CONSUMER_KEY,
  secret: process.env.TWITTER_CONSUMER_SECRET
});
const originWhitelist = (process.env.ORIGIN_WHITELIST) ? process.env.ORIGIN_WHITELIST.split(',') : [];
const cors = corsMiddleware({
  origins: originWhitelist
})

var server = restify.createServer({
  name: 'pio-server',
  version: '0.1.0',
  log: log
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(cors.actual)
server.on('after', restify.plugins.auditLogger({ event: 'after', log: log }));

server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function (req, res, next) {
  if (originWhitelist && req.headers.origin && originWhitelist.indexOf(req.headers.origin) === -1) {
    req.log.warn('CORS warning: unkown origin', req.headers.referer);
    res.send(200, {error: { code: 'CORS_Error', message: 'Unkown origin' }});
  } else {
    twitter.get({
      uri: req.url
    }, function (error, response, body) {
      if (error) {
        log.error(error.name, error.message);
        res.send(502, {error: { code: error.name, message: error.message }});
      } else {
        res.send(response.statusCode, body);
      }
    });
  }
  return next();
});

server.listen(process.env.PORT || 5000, function () {
  log.info('%s listening at %s', server.name, server.url);
});
