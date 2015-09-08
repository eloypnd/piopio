var restify = require('restify');
var bunyan = require('bunyan');
var Twitter = require('./lib/twitter');

var log = bunyan.createLogger({name: 'pio-log'});

var twitter = new Twitter({
  key: process.env.TWITTER_CONSUMER_KEY,
  secret: process.env.TWITTER_CONSUMER_SECRET
});

var server = restify.createServer({
  name: 'pio-server',
  version: '0.1.0',
  log: log
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/, function (req, res, next) {
  twitter.get({
    uri: req.url
  }, function (error, response, body) {
    res.send(response.statusCode, body);
  });
  return next();
});

server.listen(8080, function () {
  log.info('%s listening at %s', server.name, server.url);
});
