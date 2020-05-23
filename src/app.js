const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 30002;

const { fetchWheather } = require("./utils/weather");
const { fetchGeoLocation } = require("./utils/geocode");
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// This is for root route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sumant K",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sumant K",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text.",
    name: "Sumant",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.location) {
    fetchGeoLocation(req.query.location, (error, { latitude, longitude }) => {
      fetchWheather(latitude, longitude, (error1, response1) => {
        res.send(response1);
      });
    });
  } else {
    res.send("Please provide the location");
  }
});

app.get("/bot_list", (req, res) => {
  console.log(req.query);
  res.send({
    list: [{ bot_id: 1, bot_name: "Instavoice" }],
  });
});

app.get("*", (req, res) => {
  // res.send("There is nothing here, get the hell out");
  res.render("PageNotFound", {
    error: "Wrong url",
    title: "404 Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3002.");
});
