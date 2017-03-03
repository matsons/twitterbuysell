"use strict"

const express = require('express');
const http = require('http');
const twitter = require('twitter');
const config = require('./config');

// app instance, port
let app = express();
let port = process.env.port || 8080;

// no cache validation plz
app.disable('etag');

var client = new twitter(config.twitter);
console.log(config.twitter)

let stream = client.stream('statuses/filter', {track: 'maga'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

//let params = {screen_name: 'salted_hash'};
