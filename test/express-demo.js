const express = require("express");
const path = require("path");
const app = express();

app.locals.title = "Demo Project";

let viewspath = path.join(__dirname, "../templates");
app.set("views", viewspath);

app.get("/demo", (req, res) => {
  res.send("Hello this is a simple demo");
});

app.get("/", (req, res) => {
  res.send(app.locals);
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
