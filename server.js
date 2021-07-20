//import express for server endpoint
const express = require('express')

//make class Rollbar from rollbar
const Rollbar = require('rollbar')

const port = process.env.port || 4000

const rollbar = new Rollbar({
  accessToken: 'be02e119ecd545858db7b5ccd725fc39',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const app = express();
app.use(express.json())
app.use(rollbar.errorHandler())

app.get('/',(req,res)=>{
  res.status(200).send('good job')
  rollbar.info('test worked')
})

app.listen(port, ()=>{
  console.log(`server listening on port ${port}`)
})