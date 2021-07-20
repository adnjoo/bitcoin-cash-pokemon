//declare variables / import dependencies
const express = require("express");
const path = require("path");
//make class Rollbar from rollbar
const Rollbar = require("rollbar");
const port = process.env.port || 4000;

//instantiate an instance of Rollbar class below
const rollbar = new Rollbar({
  accessToken: "be02e119ecd545858db7b5ccd725fc39",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();
app.use(express.json());
app.use(rollbar.errorHandler());

let heroesList = [];

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
  // functiondoesntexist()
  rollbar.info("test worked");
});

app.post("/api/hero", (req, res) => {
  let { hero } = req.body;
  hero = hero.trim();

  const index = heroesList.findIndex((name) => {
    return name === hero;
  });

  if (index === -1 && hero !== "") {
    heroesList.push(hero);
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
