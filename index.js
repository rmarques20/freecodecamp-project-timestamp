// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  res.json({unix: (new Date()).getTime(), utc: (new Date()).toUTCString()})
})

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  let UNIX, UTC

  if((new Date(parseInt(date))).toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
    return;
  }

  if (date.indexOf("-") === -1 && date.indexOf(" ") === -1 && parseInt(date) === (new Date(parseInt(date))).getTime()) {
    UNIX = parseInt(date);
    UTC = (new Date(parseInt(date))).toUTCString();
  } else {
    UNIX = (new Date(date)).getTime();
    UTC = (new Date(date)).toUTCString();
  }


  res.json({unix: UNIX, utc: UTC});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
