# Piopio

[![Dependency Status](https://www.versioneye.com/user/projects/55f2084ad4d204001c0000f1/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55f2084ad4d204001c0000f1)

A simple server-side proxy written in nodejs to connect to Twitter API.

## Why do I need it?

[Twitter API v1.1](https://dev.twitter.com/rest/public) implements [Oauth](http://oauth.net/) 1.0A. Since it doesn't support [CORS](http://www.w3.org/TR/cors/), it is not possible make client side requests to the API.

## Requirements

We will be using [Application-only authentication](https://dev.twitter.com/oauth/application-only) to authenticate with Twitter API from our proxy. You need to create an application and get a `key`/`secret` pair [here](https://apps.twitter.com/)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:eloypnd/piopio.git # or clone your own fork
$ cd piopio
# open pio.sh and add your key/secret pair
$ npm install -g nodemon
$ npm install
$ ./pio.sh
```

Your proxy should now be running on [localhost:8080](http://localhost:8080)

## Deploying

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

```sh
$ heroku login
$ heroku create
$ heroku config:set TWITTER_CONSUMER_KEY=<your_key>
$ heroku config:set TWITTER_CONSUMER_SECRET=<your_secret>
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
