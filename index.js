"use strict"

const express = require('express');
const http = require('http');
const twitter = require('twitter');
const config = require('./config');
const pg = require('pg');

// app instance, port
let app = express();
let port = process.env.port || 8080;

// no cache validation plz
// app.disable('etag');

let client = new twitter(config.twitter);

 // todo make this dynamic, either cli or form submit
 // we could also archive ids locally to reduce API calls

client.get('users/lookup', {screen_name: "salted_hashtag"}, function(error, response) {
  if(error) throw error;
  console.log(response, response[0].id_str) // we should do error checking
  let stream = client.stream('statuses/filter', {follow: response[0].id_str}, function(stream) {
    stream.on('data', function(event) {
      console.log(event && event.text);
    });

    stream.on('error', function(error) {
      throw error;
    });
  });
});
