#!/bin/bash

# Simple bash script to run the proxy locally
# without having to type the long pair key/secret all the time

TWITTER_CONSUMER_KEY=your_twitter_app_consumer_key TWITTER_CONSUMER_SECRET=your_twitter_app_consumer_secret nodemon index.js | bunyan
