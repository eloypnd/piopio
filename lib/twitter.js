var request = require('request');
var bunyan = require('bunyan');
var _ = require('lodash');

var VERSION = '0.1.0';

var log = bunyan.createLogger({name: 'twitter-log'});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Twitter;
}

function Twitter (options) {
  if (!(this instanceof Twitter)) return new Twitter(options);

  options = (typeof options !== 'undefined') ? options : {};
  // defaults
  this.options = {
    apiHost: 'https://api.twitter.com',
    apiVersion: '1.1',
    userAgent: 'PioPio v' + VERSION,
    key: false,
    secret: false,
    accessToken: false
  };

  if ( typeof options.key === 'undefined'
       || typeof options.secret === 'undefined') {
    log.error({options: options}, 'Missing API key/secret pair required.');
    return false;
  }

  this.options.apiUri = this.options.apiHost + '/' + this.options.apiVersion;
  _.merge(this.options, options);

  // encode token to send in only app auth request
  this.options.encondedKeySecretToken = new Buffer(
    encodeURI(this.options.key) + ':' + encodeURI(this.options.secret)
  ).toString('base64');

  //get access_token
  this._appOnlyAuth();
}

Twitter.prototype._appOnlyAuth = function (callback) {
  var self = this;
  request({
    uri: this.options.apiHost + '/oauth2/token',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + this.options.encondedKeySecretToken,
      'User-Agent': this.options.userAgent
    },
    form: { grant_type: 'client_credentials' }
  }, function (error, response, body) {
    if (!error) {
      self.options.accessToken = JSON.parse(body).access_token;
    } else {
      log.error({error: error}, 'Error on Application only Authorization.');
    }
    if (typeof callback === 'function') {
      callback(error, response, body);
    }
    log.info({
      method: response.request.method,
      uri: response.request.uri.href,
      status: response.statusCode
    }, 'request: Application only Authorization');
  });
};

Twitter.prototype.get = function (options, callback) {
  options = (typeof options !== 'undefined') ? options : false;

  if (typeof options.uri === 'undefined') {
    callback(true, {}, {message: 'Missing required URI'});
  }
  if (!this.options.accessToken) {
    callback(true, {statusCode: 401}, 'Proxy missing access token');
    return;
  }

  request({
    uri: this.options.apiUri + options.uri,
    headers: {
      'Authorization': 'Bearer ' + this.options.accessToken,
      'User-Agent': this.options.userAgent
    },
    qs: {}
  }, function (error, response, body) {
    if (!error) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        log.error('Response body is not valid JSON');
        error = { name: 'TypeError', message: 'Response body is not valid JSON' };
      } finally {
        log.info({
          method: response.request.method,
          uri: response.request.uri.href,
          status: response.statusCode
        }, 'request: ' + response.request.uri.pathname);
      }
    }
    callback(error, response, body);
  });
};
