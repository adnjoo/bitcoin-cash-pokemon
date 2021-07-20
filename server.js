//import express for server endpoint
const express = require('express')

//make class Rollbar from rollbar
const Rollbar = require('rollbar')

const rollbar = new Rollbar({
  accessToken: 'be02e119ecd545858db7b5ccd725fc39',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");