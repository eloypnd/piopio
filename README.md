# Piopio

[![Dependency Status](https://www.versioneye.com/user/projects/57a83ae60f6400079bd590e9/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57a83ae60f6400079bd590e9)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple server-side proxy written in nodejs to connect to Twitter API.

## Why do I need it?

[Twitter API v1.1](https://dev.twitter.com/rest/public) implements [Oauth](http://oauth.net/) 1.0A. Since it doesn't support [CORS](http://www.w3.org/TR/cors/), it is not possible make client side requests to the API.

## Requirements

We will be using [Application-only authentication](https://dev.twitter.com/oauth/application-only) to authenticate with Twitter API from our proxy. You need to create an application and get a `key`/`secret` pair [here](https://apps.twitter.com/)

Make sure you have [Node.js](http://nodejs.org/) and [NPM](https://www.npmjs.com/) installed.

## Install

```sh
$ git clone git@github.com:eloypnd/piopio.git
$ cd piopio
$ export TWITTER_CONSUMER_KEY=<your_key>
$ export TWITTER_CONSUMER_SECRET=<your_secret>
$ npm install
```

## Usage

```sh
$ npm start # start proxy server
$ npm run dev # start development proxy server
```

Your proxy should now be running on [localhost:5000](http://localhost:5000)

## Deploying

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ heroku login
$ heroku create
$ heroku config:set TWITTER_CONSUMER_KEY=<your_key>
$ heroku config:set TWITTER_CONSUMER_SECRET=<your_secret>
# if you want CORS enabled (e.g. http://host1,http://host2)
$ heroku config:set ORIGIN_WHITELIST=<comma_separated_list_of_hosts>
$ git push heroku master
$ heroku open
```

## More information

More about CORS: [HTML5 ROCKS - Using CORS](http://www.html5rocks.com/en/tutorials/cors/)

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
- [Deploying Node.js Apps on Heroku | Heroku Dev Center](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Nodemon is amazing but it crashes your heroku deploy - farez.ca](http://farez.ca/Nodemon-is-amazing-but-it-crashes-your-heroku-deploy/)

Inspiration [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
and [mooch](https://github.com/eloquent/mooch/tree/master).


## License

The MIT License (MIT)

Copyright (c) 2015 Eloy Pineda, All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE
