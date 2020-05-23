const request = require("request");

/**
 * If address string contains special characters then they will be part of url instead of value
 * encodeURIComponent() converts those special characters to base 64 like ? converted to %3F
 * space will be converted to %20
 */

const fetchGeoLocation = (address, cb) => {
  const GEO_LOCATION_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic3VtYW50MjM0NyIsImEiOiJjazlwang4eTIwYmN2M2RxaDh1aTk4OXFxIn0.fJ8g6Wd-81HAdWf8_kbJHQ&limit=1`;

  request({ url: GEO_LOCATION_URL, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect location service", undefined);
    } else if (body.features.length === 0) {
      cb("Unable to find the location", undefined);
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  fetchGeoLocation: fetchGeoLocation,
};
