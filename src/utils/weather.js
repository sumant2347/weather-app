const request = require("request");
const fs = require("fs");

const fetchWheather = (latitude, longitude, cb) => {
  const WEATHER_URL = `http://api.weatherstack.com/current?access_key=21c0ca121f88f52b56aa4a31df128788&query=${latitude},${longitude}&units=f`;

  request({ url: WEATHER_URL, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect weather service", undefined);
    } else if (body.error) {
      cb("Unable to find the weather", undefined);
    } else {
      cb(undefined, body.current);
    }
  });
};

module.exports = {
  fetchWheather: fetchWheather,
};
