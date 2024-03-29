const express = require("express");
const app = express();
const path = require("path");
const port = 80;
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));
// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("index");
});

app.listen(port);
console.log("Server is listening on port", port);
