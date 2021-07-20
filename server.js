//declare variables / import dependencies
const express = require("express");
const path = require("path");
//make class Rollbar from rollbar
const Rollbar = require("rollbar");
// const port = process.env.PORT || 5500;
const port = process.env.PORT;

//instantiate an instance of Rollbar class below
const rollbar = new Rollbar({
  accessToken: "be02e119ecd545858db7b5ccd725fc39",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();
app.use(express.json());
app.use(rollbar.errorHandler());

let heroesList = ['Superman'];

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
    rollbar.log('hero added successfully', {
      myhero: `${hero}`,
      type: 'manual'
    })

    res.status(200).send(heroesList)
  } else if (hero === '') {
    // rollbar.error('no name given')
    rollbar.critical('no name was given')

    res.status(400).send({error: 'no name was provided'})
  } else {
    // rollbar.error('hero already exists')
    rollbar.warning('hero already exists')

    res.status(400).send({error: 'that hero already exists'})
  }


});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
