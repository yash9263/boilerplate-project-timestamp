// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// your first API endpoint...
app.get("/api/timestamp/:date_string", function (req, res) {
  const date_string = req.params.date_string;
  if (date_string.includes("-")) {
    const date = new Date(date_string);
    var unix = date.getTime();
    var utc = date.toUTCString();
  } else {
    var unix = parseInt(date_string);
    var date = new Date(unix * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formatTime =
      hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);
    var utc = date.toUTCString();
  }
  if (utc == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: unix, utc: utc });
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
